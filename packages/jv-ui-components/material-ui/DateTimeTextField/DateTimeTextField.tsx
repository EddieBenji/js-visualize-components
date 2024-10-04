/*
 * Copyright © 2024. Cloud Software Group, Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

import {
  TextField as JVTextField,
  TextFieldProps,
} from "../TextField/TextField";

export const DateTimeTextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (props, ref) => {
    const mergedInputLabelProps = {
      ...props.InputLabelProps,
      classes: { root: "jv-mInput-label mui" },
      disableAnimation: true,
    };
    const mergeInputProps = {
      ...props.InputProps,
      classes: { input: "jv-mInput-text mui" },
    };

    return (
      <JVTextField
        {...props}
        className={`${props.className || ""}`}
        variant="outlined"
        InputLabelProps={{ ...mergedInputLabelProps }}
        InputProps={{ ...mergeInputProps }}
      ></JVTextField>
    );
  },
);
