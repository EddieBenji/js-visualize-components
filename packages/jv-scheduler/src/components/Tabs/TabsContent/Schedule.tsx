import React, { useState } from "react";
import {
  JVTextField,
  JVTypography,
  JVRadioGroup,
  JVRadioButton,
  JVSelectItem,
} from "@jaspersoft/jv-ui-components";
import { timeFrames } from "../../../constants/schedulerConstants";
import { JVTypographyComponent } from "../../common/CommonComponents";

const Schedule = () => {
  const [selectedValue, setSelectedValue] = useState("option1");
  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };
  return (
    <>
      <JVTypographyComponent text="Name and Description" />
      <JVTextField size="large" label="Scheduled job name (required)" />
      <JVTextField size="large" label="Description" multiline rows={5} />
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
          defaultValue="1"
        />
        <div className="jv-mControl-timeframe mui">
          <JVTextField
            size="large"
            label="Timeframe (required)"
            textFieldClassName="jv-uWidth-175px"
            select
          >
            {timeFrames.map((timeFrame) => (
              <JVSelectItem
                key={timeFrame.value}
                value={timeFrame.value}
                label="Days"
              >
                {timeFrame.textPlural}
              </JVSelectItem>
            ))}
          </JVTextField>
        </div>
      </div>

      <JVRadioGroup size="large">
        <JVTypography>Start time (required)</JVTypography>
        <JVRadioButton
          id="now"
          value="now"
          label="Now"
          checked={selectedValue === "option1"}
          onChange={() => handleRadioChange("option1")}
        />
        <JVRadioButton
          id="specificDate"
          value="specificDate"
          label="Specific date and time"
          checked={selectedValue === "option2"}
          onChange={() => handleRadioChange("option2")}
        />
      </JVRadioGroup>
      <div className="jv-uMargin-l-07 jv-uWidth-200px">
        <JVTextField
          size="large"
          type="date"
          defaultValue=""
          disabled={selectedValue !== "option2"}
        />
      </div>
    </>
  );
};

export default Schedule;
