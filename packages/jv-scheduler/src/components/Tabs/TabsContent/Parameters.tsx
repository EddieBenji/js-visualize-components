import React, { useEffect } from "react";
import { InputControlsPanel } from "@jaspersoft/jv-input-controls";
import { JVTypographyComponent } from "../../common/CommonComponents";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  parametersTabErrorOrLoading,
  scheduleValidationError,
  setPropertiesDetails,
} from "../../../actions/action";

const Parameters = () => {
  const { t } = useTranslation() as { t: (k: string) => string };
  const dispatch = useDispatch();
  const visualize = useSelector((state: any) => state.visualize);
  const source = useSelector((state: any) => state.scheduleInfo.source);
  const resourceUri = useSelector(
    (state: any) => state.schedulerUIConfig.resourceURI,
  );

  useEffect(() => {
    dispatch(parametersTabErrorOrLoading({ isError: false, isLoaded: false }));
  }, []);

  const updateStoreWithParameters = (params: any) => {
    dispatch(parametersTabErrorOrLoading({ isLoaded: false, isError: false }));
    dispatch(
      setPropertiesDetails({
        source: {
          ...source,
          parameters: {
            parameterValues: params,
          },
        },
      }),
    );
  };

  const panelD: any = {
    config: { bool: { type: "switch" } },
    success: (params) => {
      debugger;
      updateStoreWithParameters(params.parameters);
    },
    error: (error) => {
      debugger;
      dispatch(parametersTabErrorOrLoading({ isLoaded: false, isError: true }));
      console.log("Error when rendering the Basic controls: ", error);
    },
    events: {
      change: (ics: any, vs: any) => {
        console.log("NEW ICS!! ", ics);
        if (vs) console.log("Validations: ", vs);
        if (vs) {
          dispatch(
            scheduleValidationError({ parameters: "error.parameters.error" }),
          );
        }
        updateStoreWithParameters(ics);
      },
    },
  };

  return (
    <>
      <JVTypographyComponent text={t("parameters.title")} />
      <InputControlsPanel
        vObject={visualize.v}
        uri={resourceUri}
        panelDef={panelD}
      />
    </>
  );
};

export default Parameters;
