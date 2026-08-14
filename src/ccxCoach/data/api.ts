import { camelCaseObject, getAuthenticatedHttpClient } from '@openedx/frontend-base';
import { getApiBaseUrl } from '@src/data/api';
import { CcxCoachInfoResponse } from '../types';

export const getCcxCoachInfo = async (courseId: string): Promise<CcxCoachInfoResponse> => {
  const { data } = await getAuthenticatedHttpClient()
    .get(`${getApiBaseUrl()}/api/instructor/v2/ccx-coach/${courseId}/metadata`);
  return camelCaseObject(data);
};
