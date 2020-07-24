import * as typesAction from './typesAction';

export const getAllNotification = pageIndex => {
  return {
    type: typesAction.GET_ALL_NOTIFICATION,
    pageIndex,
  };
};
export const getAllNotificationSuccess = (data, pageIndex) => {
  return {
    type: typesAction.GET_ALL_NOTIFICATION_SUCCESS,
    data,
    pageIndex,
  };
};

export const getAllNotificationFailed = error => {
  return {
    type: typesAction.GET_NOTIFICATION_BY_ID,
    error,
  };
};

export const getNotificationById = notifyId => {
  return {
    type: typesAction.GET_NOTIFICATION_BY_ID,
    notifyId,
  };
};

export const getNotificationByIdSuccess = data => {
  return {
    type: typesAction.GET_NOTIFICATION_BY_ID_SUCCESS,
    data,
  };
};

export const getNotificationByIdFailed = error => {
  return {
    type: typesAction.GET_NOTIFICATION_BY_ID_FAILED,
    error,
  };
};

export const seenNotify = notifyId => {
  return {
    type: typesAction.SEEN_NOTIFY,
    notifyId,
  };
};

export const seenNotifySuccess = (data, itemNotify) => {
  return {
    type: typesAction.SEEN_NOTIFY_SUCCESS,
    data,
    itemNotify
  };
};

export const seenNotifyFailed = error => {
  return {
    type: typesAction.SEEN_NOTIFY_FAILEDTIFY,
    error,
  };
};