import { TextField as JVTextField } from "@jaspersoft/jv-ui-components/material-ui/TextField/TextField";
import { BaseInputControlProps } from "./BaseInputControl";
import { useControlClasses } from "./hooks/useControlClasses";
import { useLiveState } from "./hooks/useLiveState";

export type TextFieldICType = "textField";

export interface TextFieldICProps extends BaseInputControlProps {
  defaultValue?: string;
  value?: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
  size?: "large";
  className?: string;
}

/**
 * Text Input Control Component
 *
 * Will handle the text based input controls
 * @param props
 * @constructor
 */
export const SingleValueTextInputControl = (props: TextFieldICProps) => {
  const {
    value: theValue,
    size = "large",
    className,
    defaultValue,
    mandatory,
    readOnly,
    visible,
    ...remainingProps
  } = props;
  const liveState = useLiveState({
    initialValue: props.state?.value || theValue || defaultValue || "",
  });
  const controlClasses = useControlClasses([], props);
  // inputProps is needed to handle readOnly by TextField from MUI natively:
  const inputProps: any = {};
  if (readOnly) {
    inputProps.readOnly = true;
  }
  const theInputProps = { ...inputProps, ...liveState };
  return (
    <JVTextField
      {...remainingProps}
      size={size}
      variant={props.variant || "outlined"}
      className={`${controlClasses.join(" ")} ${className || ""}`}
      InputProps={theInputProps}
    />
  );
};
