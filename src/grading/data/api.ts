import { camelCaseObject, getAuthenticatedHttpClient } from '@openedx/frontend-base';
import { getApiBaseUrl } from '@src/data/api';

export const getLearnerGrading = async (courseId: string, emailOrUsername: string) => {
  const { data } = await getAuthenticatedHttpClient()
    .get(`${getApiBaseUrl()}/api/instructor/v2/courses/${courseId}/learners/${emailOrUsername}`);
  return camelCaseObject(data);
};
