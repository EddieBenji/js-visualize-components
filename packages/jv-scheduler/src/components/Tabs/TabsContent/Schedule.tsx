import React, { ChangeEvent, useEffect, useState } from "react";
import {
  JVTextField,
  JVTypography,
  JVRadioGroup,
  JVRadioButton,
  JVSelectItem,
} from "@jaspersoft/jv-ui-components";
import {
  SCHEDULE_JOB_DESCRIPTION,
  SCHEDULE_JOB_NAME,
  timeFrames,
} from "../../../constants/schedulerConstants";
import { JVTypographyComponent } from "../../common/CommonComponents";
import { useSelector } from "react-redux";
import { IState } from "../../../types/schedulerTypes";
import { useStoreUpdate } from "../../../hooks/useStoreUpdate";

const Schedule = () => {
  const scheduleJobName = useSelector(
    (state: IState) => state.scheduleInfo.scheduleJobName,
  );
  const scheduleJobDescription = useSelector(
    (state: IState) => state.scheduleInfo.scheduleJobDescription,
  );
  const simpleTrigger = useSelector(
    (state: IState) => state.scheduleInfo.trigger.simpleTrigger,
  );
  const outputTimeZone = useSelector(
    (state: IState) => state.scheduleInfo.outputTimeZone,
  );
  const [scheduleName, setScheduleName] = useState(scheduleJobName);
  const [scheduleDescription, setScheduleDescription] = useState(
    scheduleJobDescription,
  );
  const updateStore = useStoreUpdate();
  const {
    recurrenceInterval,
    recurrenceIntervalUnit,
    startType: storeStartType,
    startDate,
  } = simpleTrigger;
  const [recurrenceInt, setRecurrenceInterval] = useState<string | number>(
    recurrenceInterval,
  );
  const [recurrenceUnit, setRecurrenceUnit] = useState(recurrenceIntervalUnit);
  const [startType, setStartType] = useState(storeStartType);
  const [specificDateTime, setSpecificDateTime] = useState<string>("");

  useEffect(() => {
    if (startDate) setSpecificDateTime(startDate);
  }, [startDate]);

  useEffect(() => {
    setScheduleName(scheduleJobName);
  }, [scheduleJobName]);

  useEffect(() => {
    setRecurrenceInterval(recurrenceInterval);
  }, [recurrenceInterval]);

  useEffect(() => {
    setRecurrenceUnit(recurrenceUnit);
  }, [recurrenceUnit]);

  const handleIntervalChange = (value: string) => {
    setRecurrenceInterval(value);
  };

  const handleTimeFrameChange = (newVal: string) => {
    setRecurrenceUnit(newVal);
    updateRecurrenceToStore({ recurrenceIntervalUnit: newVal });
  };

  const updateChangeToStore = (
    propertyName: string,
    propertyValue: string | string[] | number,
  ) => {
    updateStore({ [propertyName]: propertyValue });
  };

  const handleStartType = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = +e.target.value;
    let changedVal: { startType: number; startDate: null | string } = {
      startType: newVal,
      startDate: null,
    };
    changedVal =
      newVal === 1
        ? { ...changedVal }
        : { ...changedVal, ...{ startDate: specificDateTime, outputTimeZone } };
    setStartType(newVal);
    updateRecurrenceToStore(changedVal);
  };

  const updateRecurrenceToStore = (newProperty: {
    [key: string]: string | number | null;
  }) => {
    const triggerValues = { ...simpleTrigger, ...newProperty };
    updateStore({ trigger: { simpleTrigger: triggerValues } });
  };

  return (
    <>
      <JVTypographyComponent text="Name and Description" />
      <JVTextField
        size="large"
        label="Scheduled job name (required)"
        value={scheduleName}
        onChange={(e) => setScheduleName(e.target.value)}
        onBlur={() => {
          updateChangeToStore(SCHEDULE_JOB_NAME, scheduleName);
        }}
      />
      <JVTextField
        size="large"
        label="Description"
        multiline
        rows={5}
        value={scheduleDescription}
        onChange={(e) => {
          setScheduleDescription(e.target.value);
        }}
        onBlur={() =>
          updateChangeToStore(SCHEDULE_JOB_DESCRIPTION, scheduleDescription)
        }
      />
      <JVTypographyComponent text={"Recurrence"} />
      <div className="jv-mControl jv-mControlInterval jv-mControlFlexwidth mui">
        <JVTextField
          id="recurrenceInterval"
          label="Interval (required)"
          size="large"
          className="jv-mControl-interval mui"
          InputLabelProps={{
            shrink: true,
          }}
          textFieldClassName="jv-uWidth-140px"
          type="number"
          value={String(recurrenceInt)}
          onChange={(e) => handleIntervalChange(e.target.value)}
          onBlur={() => {
            const convertedValue = Number(recurrenceInt);
            setRecurrenceInterval(convertedValue);
            updateRecurrenceToStore({ recurrenceInterval: convertedValue });
          }}
        />
        <div className="jv-mControl-timeframe mui">
          <JVTextField
            size="large"
            label="Timeframe (required)"
            textFieldClassName="jv-uWidth-175px"
            select
            value={recurrenceUnit}
            onChange={(e) => handleTimeFrameChange(e.target.value)}
          >
            {timeFrames.map((timeFrame) => (
              <JVSelectItem key={timeFrame.value} value={timeFrame.value}>
                {timeFrame.textPlural}
              </JVSelectItem>
            ))}
          </JVTextField>
        </div>
      </div>

      <JVRadioGroup
        size="large"
        RadioGroupProps={{ onChange: handleStartType }}
      >
        <JVTypography>Start time (required)</JVTypography>
        <JVRadioButton
          id="start-now"
          value="start-now"
          label="Now"
          RadioProps={{
            value: 1,
            checked: startType === 1,
          }}
        />
        <JVRadioButton
          id="specificDate"
          value="start-specific-time"
          label="Specific date and time"
          RadioProps={{
            value: 2,
            checked: startType === 2,
          }}
        />
      </JVRadioGroup>
      <div className="jv-uMargin-l-07 jv-uWidth-200px">
        <JVTextField
          size="large"
          type="date"
          disabled={startType === 1}
          value={specificDateTime.split(" ").join("T")}
          onChange={(e) => {
            const formattedDate = e.target.value.split("T").join(" ");
            setSpecificDateTime(formattedDate);
          }}
          onBlur={() =>
            updateRecurrenceToStore({
              startDate: specificDateTime,
              startType,
              outputTimeZone,
            })
          }
        />
      </div>
    </>
  );
};

export default Schedule;
