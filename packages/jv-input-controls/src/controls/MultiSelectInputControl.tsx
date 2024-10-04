import { useControlClasses } from "./hooks/useControlClasses";
import { useErrorMsg } from "./hooks/useErrorMsg";
import { useLiveState } from "./hooks/useLiveState";
import { JVMultiSelect } from "@jaspersoft/jv-ui-components";

export type MultiSelectICType = "multiSelect";

export const MultiSelectInputControl = (props: any): JSX.Element => {
  const liveState = useLiveState([]);
  const controlClasses = useControlClasses([], props);
  const errorText = useErrorMsg({
    textValue: liveState.value,
    props,
  });
  return (
    <JVMultiSelect
      {...liveState}
      label={props.label}
      id={props.id}
      key={props.id}
      state={props.state}
      className={`${controlClasses.join(" ")}`}
      error={errorText}
    />
  );
};
