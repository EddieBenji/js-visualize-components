import {
  SET_OUTPUT_FORMATS,
  SET_REPOSITORY_FOLDER_DATA,
  SET_SCHEDULER_UI_CONFIG,
  SET_USER_TIME_ZONES,
  SET_PROPERTIES_DETAILS,
} from "../constants/actionConstants";
import {
  getOutputFormatsFromService,
  getRepositoryFolderData,
  getUserTimezonesFromService,
} from "../services/schedulerServices";
import { ISchedulerUIConfig } from "../types/schedulerUIConfigTypes";
import { IScheduleInfo, IStoreData } from "../types/schedulerTypes";

// export const setUserLocale = (supportedLocale) => {
//    return {
//         type: SET_USER_LOCALE,
//         payload: {
//             userLocale: supportedLocale
//         }
//     }
// }

export const setOutputFormats = (outputFormats) => {
  return {
    type: SET_OUTPUT_FORMATS,
    payload: {
      outputFormats: outputFormats,
    },
  };
};

export const setUserTimeZones = (timeZones) => {
  return {
    type: SET_USER_TIME_ZONES,
    payload: {
      userTimeZones: timeZones,
    },
  };
};

export const setPropertiesDetails = (
  scheduleInfo: IScheduleInfo | IStoreData,
) => {
  return {
    type: SET_PROPERTIES_DETAILS,
    payload: { newScheduleInfo: scheduleInfo },
  };
};

export const setSechedulerUIConfig = (
  schedulerUIConfig: ISchedulerUIConfig,
) => {
  return {
    type: SET_SCHEDULER_UI_CONFIG,
    payload: {
      schedulerUIConfig: schedulerUIConfig,
    },
  };
};

export const setRepositoryFolderData = (folderData) => {
  return {
    type: SET_REPOSITORY_FOLDER_DATA,
    payload: {
      folderData: folderData,
    },
  };
};

export const getOutputFormats = () => {
  return async (dispatch) => {
    const outputFormats = await getOutputFormatsFromService();
    if (outputFormats.error) {
      // dispatch error action
    } else {
      dispatch(setOutputFormats(outputFormats.dashboard.outputFormats));
    }
  };
};

export const getUserTimeZones = () => {
  return async (dispatch) => {
    const timezones = await getUserTimezonesFromService();
    if (timezones.error) {
      // dispatch error action
    } else {
      dispatch(setUserTimeZones(timezones));
    }
  };
};

export const getFolderData = (folderPath: string) => {
  return async (dispatch) => {
    const repositoryData = await getRepositoryFolderData(folderPath);
    console.log(repositoryData);
    if (repositoryData.error) {
      // dispatch error action
    } else {
      const folderData = repositoryData.resourceLookup || {};
      dispatch(setRepositoryFolderData({ [folderPath]: folderData }));
    }
  };
};
