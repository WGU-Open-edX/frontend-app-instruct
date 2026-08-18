import { camelCaseObject, getAuthenticatedHttpClient } from '@openedx/frontend-base';
import { getApiBaseUrl } from '@src/data/api';
import { CcxCoachInfoResponse } from '../types';

export const getCcxCoachInfo = async (courseId: string): Promise<CcxCoachInfoResponse> => {
  const { data } = await getAuthenticatedHttpClient()
    .get(`${getApiBaseUrl()}/api/ccx_coach/v2/courses/${courseId}/metadata`);
  return camelCaseObject(data);
};

export const createCcxCoachCourse = async (courseId: string, ccxCourseName: string) => {
  const { data } = await getAuthenticatedHttpClient().post(
    `${getApiBaseUrl()}/api/ccx_coach/v2/courses/${courseId}/create_ccx`,
    {
      name: ccxCourseName
    },
  );
  return camelCaseObject(data);
};
