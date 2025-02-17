/*
 * Copyright © 2024. Cloud Software Group, Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApiFailure } from "../../actions/action";
import { IState } from "../../types/scheduleType";
import { ErrorDialog } from "../common/ErrorDialog";

const errorDialogAPI = [
  "createScheduleApiFailure",
  "initialTreeDataLoadApiFailure",
  "treeLoadApiFailure",
];
export const ErrorConfirmationDialog = () => {
  const dispatch = useDispatch();
  const listOfApiFailed = useSelector(
    (state: IState) => state.scheduleApisFailure,
  );
  const lastApiCallFail = useSelector(
    (state: IState) => state.lastApiCalledFailed,
  );

  const handleCancelBtn = () => {
    dispatch(setApiFailure(listOfApiFailed, ""));
  };

  const errorMap: any = {
    createScheduleApiFailure: [
      "You can close this error message and try to save the schedule again.",
      "A network error is preventing the schedule from being saved.",
    ],
    initialTreeDataLoadApiFailure: [
      "You can close this error message and try to open repo dialog again.",
      "A network error is preventing the repo from being opened.",
    ],
    treeLoadApiFailure: [
      "You can close this error message and try to open repository dialog again.",
      "A network error is preventing the repository dialog from being opened.",
    ],
  };

  const getErrorMessage = () => {
    const isErrorDialogReq =
        typeof lastApiCallFail === "string" &&
        errorDialogAPI.indexOf(lastApiCallFail) > -1,
      errorMsg = isErrorDialogReq ? errorMap[lastApiCallFail][0] : "",
      subContainMsg = isErrorDialogReq ? errorMap[lastApiCallFail][1] : "";
    return {
      errorMsg,
      subContainMsg,
    };
  };

  const { errorMsg, subContainMsg } = getErrorMessage();

  return (
    <ErrorDialog
      handleCancelBtn={handleCancelBtn}
      errorMsg={errorMsg}
      subContainerMsg={subContainMsg}
      style={{ zIndex: 1350 }}
    />
  );
};
