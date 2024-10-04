/*
 * Copyright © 2024. Cloud Software Group, Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

import { JVSelect } from "@jaspersoft/jv-ui-components";
import React from "react";
import { InputControlProperties } from "@jaspersoft/jv-tools";
import { useControlClasses } from "./hooks/useControlClasses";
import { useErrorMsg } from "./hooks/useErrorMsg";
import { useLiveState } from "./hooks/useLiveState";

export interface SingleSelectInputControlProps extends InputControlProperties {}
export type SingleSelectICType = "singleSelect";

export function SingleSelectInputControl(
  props: SingleSelectInputControlProps,
): React.JSX.Element {
  const liveState = useLiveState("");
  const controlClasses = useControlClasses([], props);
  const errorText = useErrorMsg({
    textValue: liveState.value,
    props,
  });
  return (
    <JVSelect
      onChange={liveState.onChange}
      defaultValue={""}
      label={props.label}
      id={props.id}
      key={props.id}
      value={liveState.value}
      state={props.state}
      textFieldClassName={`${controlClasses.join(" ")}`}
      error={errorText}
    />
  );
}
