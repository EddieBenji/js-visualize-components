import React, { useEffect, useState } from "react";
import {
  JVButton,
  JVRadioButton,
  JVRadioGroup,
  JVTextField,
} from "@jaspersoft/jv-ui-components";
import { JVTypographyComponent } from "../../../common/CommonComponents";
import { RepositoryTreeDialog } from "./RepositoryTreeDialog";
import { getFolderData } from "../../../../actions/action";
import { useDispatch } from "react-redux";
import { RepositoryTree } from "./RepositoryTree";
import { useStoreUpdate } from "./../../../../hooks/useStoreUpdate";
import { useSelector } from "react-redux";
import { IState } from "../../../../types/schedulerTypes";

const Notifications = () => {
  const [selectedValue, setSelectedValue] = useState("option1");
  const [open, setOpen] = useState(false);
  const mailNotification = useSelector(
    (state: IState) => state.scheduleInfo.mailNotification,
  );
  const {
    messageText,
    subject,
    toAddresses: { address },
  } = mailNotification;
  const [mailAddress, setMailAddress] = useState(address);
  const [mailSubject, setMailSubject] = useState(subject);
  const [mailMessageText, setMailMessageText] = useState(messageText);
  const updateStore = useStoreUpdate();
  const dispatch = useDispatch();

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  const updateChangeToStore = (updateProperty: any) => {
    updateStore({
      mailNotification: { ...mailNotification, ...updateProperty },
    });
  };

  useEffect(() => {
    setMailAddress(mailAddress);
  }, [mailAddress]);

  useEffect(() => {
    setMailSubject(mailSubject);
  }, [mailSubject]);

  useEffect(() => {
    setMailMessageText(mailMessageText);
  }, [mailMessageText]);

  return (
    <>
      <JVTypographyComponent text="Email Notification" />
      <div className="jv-mInputs mui">
        <JVTextField
          size="large"
          label="Send to (required)"
          helperText="Use commas to separate email addresses."
          value={mailAddress}
          onChange={(e) => setMailAddress(e.target.value)}
          onBlur={() => {
            const addressArr = mailAddress.length
              ? mailAddress.split(new RegExp(" *, *"))
              : mailAddress;
            updateChangeToStore({ toAddresses: { address: addressArr } });
          }}
        />
        <JVTextField
          size="large"
          label="Subject (required)"
          value={mailSubject}
          onChange={(e) => setMailSubject(e.target.value)}
          onBlur={() => updateChangeToStore({ subject: mailSubject })}
        />
        <JVTextField
          size="large"
          label="Message"
          multiline
          rows={5}
          value={mailMessageText}
          onChange={(e) => setMailMessageText(e.target.value)}
          onBlur={() => updateChangeToStore({ messageText: mailMessageText })}
        />
        <JVRadioGroup title="Report/dashboard access (required)">
          <JVRadioButton
            value="option1"
            label="Include report/dashboard as repository link."
            checked={selectedValue === "option1"}
            onChange={() => handleRadioChange("option1")}
          />

          <div className="jv-mInput jv-mInputBrowse jv-mInputLarge jv-uMargin-l-07 mui">
            <JVTextField
              label="Repository URI"
              disabled={selectedValue !== "option1"}
              value="/path/"
            />
            <JVButton
              variant="contained"
              size="large"
              disabled={selectedValue !== "option1"}
              onClick={() => {
                dispatch(getFolderData("/public"));
                dispatch(getFolderData("/public/Samples"));
                dispatch(getFolderData("/public/Samples/Reports"));
                setOpen(true);
              }}
            >
              Browse...
            </JVButton>
          </div>

          <JVRadioButton
            value="option2"
            label="Include report/dashboard file as attachment."
            checked={selectedValue === "option2"}
            onChange={() => handleRadioChange("option2")}
          />
        </JVRadioGroup>
      </div>
      <RepositoryTreeDialog open={open} />
    </>
  );
};

export default Notifications;
