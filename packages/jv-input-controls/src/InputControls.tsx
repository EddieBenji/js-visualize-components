import * as React from 'react'
import { BoolICType } from './controls/BooleanInputControl'
import { createRoot } from 'react-dom/client'
import BasePanel from './panels/BasePanel'
import { InputControlCollection } from './controls/BaseInputControl';

export interface InputControlConfig {
  hostname?: string,
  username: string,
  password: string,
  tenant: string,
};

export interface InputControlPanelConfig {
  booleanStyle?: BoolICType,
  //text?: TextICType,
}

const defaultInputControlConfig: InputControlConfig = {
  username: 'joeuser',
  password: 'joeuser',
  tenant: 'organization_1',
};

export class InputControls {
  private viz: any;
  private _config: InputControlConfig;
  protected controlStructure: object = {};

  get config(): InputControlConfig {
    return this._config;
  }

  set config(value: InputControlConfig) {
    this._config = value;
  }

  constructor(vizjs: any, config?: InputControlConfig) {
    this.viz = vizjs;
    this._config = config || defaultInputControlConfig;
  }

  public fillControlStructure = (uri: string, callbackFn?: Function) => {
    this.viz.inputControls({
      resource: uri,
      success: (data: string) => {
        this.controlStructure = { ...this.controlStructure, data };
        if (callbackFn) {
          callbackFn(this.controlStructure);
        }
      },
      error: (e: object) => {
        console.log(e);
      },
    });
  }

  public getControls = () => {
    return this.controlStructure;
  }

  public renderControlPanel = (uri: string, container: HTMLElement, config?: InputControlPanelConfig) => {
    this.fillControlStructure(uri, (controls: InputControlCollection) => {
      const icRoot = createRoot(container);
      icRoot.render(<BasePanel controls={controls} booleanStyle={config?.booleanStyle} />);
    });
  }

  public makeControlsForReport = (resourceUri: string, container: HTMLElement) => {
    this.fillControlStructure(resourceUri);
    container.innerText = JSON.stringify(this.controlStructure);
  }

}
