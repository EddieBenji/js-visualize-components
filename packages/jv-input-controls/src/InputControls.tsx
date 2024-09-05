import { JVStylesProvider } from "@jaspersoft/jv-ui-components";
import { createRoot } from "react-dom/client";
import { InputControlCollection } from "./controls/BaseInputControl";
import { BoolICType } from "./controls/BooleanInputControl";
import { DatePickerICType } from "./controls/DatePickerInputControl";
import { DateICType } from "./controls/DatePickerTextFieldInputControl";
import { DateTimePickerICType } from "./controls/DateTimePickerInputControl";
import { DateTimeICType } from "./controls/DateTimePickerTextFieldInputControl";
import { NumberICType } from "./controls/SingleValueNumberInputControl";
import { TextFieldICType } from "./controls/SingleValueTextInputControl";
import { TimePickerICType } from "./controls/TimePickerInputControl";
import { TimeICType } from "./controls/TimePickerTextFieldInputControl";
import BasePanel from "./panels/BasePanel";

export interface InputControlUserConfig {
  bool?: {
    type: BoolICType;
  };
  singleValueText?: {
    type: TextFieldICType;
  };
  singleValueNumber?: {
    type: NumberICType;
  };
  singleValueDate?: {
    type: DateICType | DatePickerICType;
  };
  singleValueDatetime?: {
    type: DateTimeICType | DateTimePickerICType;
  };
  singleValueTime?: {
    type: TimeICType | TimePickerICType;
  };
}

export interface InputControlPanelConfig {
  success?: () => void;
  error?: (error: any) => void;
  exclude?: string[];
  config?: InputControlUserConfig;
  events?: {
    change?: (
      ic: { [key: string]: any[] },
      validationResult: { [key: string]: string } | boolean,
    ) => void;
  };
}

export class InputControls {
  private viz: any;
  protected controlStructure: object = {};

  constructor(vizjs: any) {
    this.viz = vizjs;
  }

  public fillControlStructure = (
    uri: string,
    callbackFn?: Function,
    callbackErrorFn?: Function,
  ) => {
    this.viz.inputControls({
      resource: uri,
      success: (data: string) => {
        this.controlStructure = { ...this.controlStructure, data };
        if (callbackFn) {
          callbackFn(this.controlStructure);
        }
      },
      error: (e: object) => {
        if (callbackErrorFn) {
          callbackErrorFn(e);
        }
      },
    });
  };

  public getControls = () => {
    return this.controlStructure;
  };

  public renderControlPanel = (
    uri: string,
    container: HTMLElement,
    icPanelDef?: InputControlPanelConfig,
  ) => {
    this.fillControlStructure(
      uri,
      (controls: InputControlCollection) => {
        try {
          const icRoot = createRoot(container);
          icRoot.render(
            <JVStylesProvider>
              <BasePanel
                controls={controls}
                config={icPanelDef?.config}
                events={icPanelDef?.events}
              />
            </JVStylesProvider>,
          );
          icPanelDef?.success && icPanelDef?.success.call(null);
        } catch (e) {
          icPanelDef?.error && icPanelDef?.error.call(null, e);
        }
      },
      (e: any) => {
        icPanelDef?.error && icPanelDef?.error.call(null, e);
      },
    );
  };

  public makeControlsForReport = (
    resourceUri: string,
    container: HTMLElement,
  ) => {
    this.fillControlStructure(resourceUri);
    container.innerText = JSON.stringify(this.controlStructure);
  };
}
