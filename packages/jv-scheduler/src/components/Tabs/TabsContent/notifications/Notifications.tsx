import React, { ChangeEvent, useEffect, useState } from "react";
import {
  JVButton,
  JVRadioButton,
  JVRadioGroup,
  JVTextField,
} from "@jaspersoft/jv-ui-components";
import { JVTypographyComponent } from "../../../common/CommonComponents";
import { RepositoryTreeDialog } from "./RepositoryTreeDialog";
import { getFakeRootData, getFolderData } from "../../../../actions/action";
import { useDispatch, useSelector } from "react-redux";
import { useStoreUpdate } from "../../../../hooks/useStoreUpdate";
import { IState } from "../../../../types/schedulerTypes";
import {
  NOTIFICATIONS_TAB,
  SEND_ATTACHMENT,
  SEND_LINK,
} from "../../../../constants/schedulerConstants";
import { getExpandedNodeDataFromUri } from "../../../../utils/schedulerUtils";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const { t } = useTranslation() as { t: (k: string) => string };
  const mailNotification = useSelector(
    (state: IState) => state.scheduleInfo.mailNotification,
  );
  const folderData = useSelector((state: any) => state.folderData);
  const resourceUri = useSelector(
    (state: any) => state.schedulerUIConfig.resourceURI,
  );
  const fakeRoot = useSelector((state: any) => state.fakeRoot);
  const {
    messageText,
    subject,
    toAddresses: { address },
    resultSendType,
  } = mailNotification;

  const [open, setOpen] = useState(false);
  const [mailAddress, setMailAddress] = useState(address);
  const [mailSubject, setMailSubject] = useState(subject);
  const [mailMessageText, setMailMessageText] = useState(messageText);
  const [sendType, setSendType] = useState(resultSendType);

  const updateStore = useStoreUpdate(NOTIFICATIONS_TAB);
  const dispatch = useDispatch();

  const updateChangeToStore = (updateProperty: any) => {
    updateStore({
      mailNotification: { ...mailNotification, ...updateProperty },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedVal = e.target.value,
      saveToRepositoryVal = selectedVal === SEND_LINK,
      updatedProperty = {
        mailNotificationVal: {
          ...mailNotification,
          resultSendType: selectedVal,
        },
        resultSendType: selectedVal,
      };
    setSendType(selectedVal);
    updateChangeToStore(updatedProperty);
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

  const handleBrowseButtonClick = () => {
    // get data for what to show in the tree on first level
    if (!fakeRoot.length) {
      dispatch(getFakeRootData());
    }
    // get children data for each folder of resource uri
    getExpandedNodeDataFromUri(resourceUri, true, (uri: string) => {
      if (!folderData[uri]) {
        dispatch(getFolderData(uri));
      }
    });
    setOpen(true);
  };

  return (
    <>
      <JVTypographyComponent text={t("notifications.email.title")} />
      <div className="jv-mInputs mui">
        <JVTextField
          size="large"
          label={t("notifications.email.recipients.label")}
          helperText={t("notifications.email.helpertext")}
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
          label={t("notifications.email.subject.label")}
          value={mailSubject}
          onChange={(e) => setMailSubject(e.target.value)}
          onBlur={() => updateChangeToStore({ subject: mailSubject })}
        />
        <JVTextField
          size="large"
          label={t("notifications.email.message.label")}
          multiline
          rows={5}
          value={mailMessageText}
          onChange={(e) => setMailMessageText(e.target.value)}
          onBlur={() => updateChangeToStore({ messageText: mailMessageText })}
        />
        <JVRadioGroup
          title={t("notifications.radiogroup.title")}
          RadioGroupProps={{ value: sendType, onChange: handleChange }}
        >
          <JVRadioButton
            label={t("notifications.repositoryLink.label")}
            RadioProps={{
              value: SEND_LINK,
              checked: sendType === SEND_LINK,
            }}
          />

          <div className="jv-mInput jv-mInputBrowse jv-mInputLarge jv-uMargin-l-07 mui">
            <JVTextField
              label={t("notifications.uri.label")}
              disabled={sendType !== SEND_LINK}
              value="/path/"
            />
            <JVButton
              variant="contained"
              size="large"
              disabled={sendType !== SEND_LINK}
              onClick={handleBrowseButtonClick}
            >
              {t("notifications.browse.button")}
            </JVButton>
          </div>

          <JVRadioButton
            label={t("notifications.fileAsAttachment.label")}
            RadioProps={{
              value: SEND_ATTACHMENT,
              checked: sendType === SEND_ATTACHMENT,
            }}
          />
        </JVRadioGroup>
      </div>
      <RepositoryTreeDialog
        open={open}
        handleDialogState={(isOpen) => setOpen(isOpen)}
      />
    </>
  );
};

export default Notifications;
