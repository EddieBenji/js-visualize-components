import * as React from 'react'
import { BoolICType } from './controls/BooleanInputControl'
import { createRoot } from 'react-dom'
import BasePanel from './panels/BasePanel'

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
  private config: InputControlConfig;
  protected controlStructure: object = {};

  constructor(vizjs: any, config?: InputControlConfig) {
    this.viz = vizjs;
    this.config = config || defaultInputControlConfig;
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
    this.fillControlStructure(uri, (controls) => {
      const icRoot = createRoot(container);
      icRoot.render(<BasePanel controls={controls} booleanStyle={config?.booleanStyle} />);
    });
  }

  public makeControlsForReport = (resourceUri: string, container: HTMLElement) => {
    this.fillControlStructure(resourceUri);
    container.innerText = JSON.stringify(this.controlStructure);
  }

}
