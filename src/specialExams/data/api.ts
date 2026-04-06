import { getAuthenticatedHttpClient, camelCaseObject } from '@openedx/frontend-base';
import { getApiBaseUrl } from '@src/data/api';
import { DataList } from '@src/types';
import { AddAllowanceParams, Allowance, Attempt, AttemptsParams } from '../types';

const getQueryParams = (params: AttemptsParams) => {
  const queryParams = new URLSearchParams({
    page: (params.page + 1).toString(),
    page_size: params.pageSize.toString(),
  });

  if (params.emailOrUsername) {
    queryParams.append('email_or_username', params.emailOrUsername);
  }

  return queryParams;
};

export const getAttempts = async (courseId: string, params: AttemptsParams): Promise<DataList<Attempt>> => {
  const queryParams = getQueryParams(params);

  const { data } = await getAuthenticatedHttpClient().get(
    `${getApiBaseUrl()}/courses/${courseId}/instructor/api/get_student_attempts?${queryParams.toString()}`
  );
  return camelCaseObject(data);
};

export const getAllowances = async (courseId: string, params: AttemptsParams): Promise<DataList<Allowance>> => {
  const queryParams = getQueryParams(params);

  const { data } = await getAuthenticatedHttpClient().get(
    `${getApiBaseUrl()}/courses/${courseId}/instructor/api/get_student_allowances?${queryParams.toString()}`
  );
  return camelCaseObject(data);
};

export const addAllowance = async (courseId: string, newAllowance: AddAllowanceParams): Promise<Allowance[]> => {
  const { data } = await getAuthenticatedHttpClient().post(
    `${getApiBaseUrl()}/courses/${courseId}/instructor/api/add_allowance`,
    newAllowance
  );
  return camelCaseObject(data);
};

export const deleteAllowance = async (courseId: string, allowanceId: number): Promise<void> => {
  await getAuthenticatedHttpClient().delete(
    `${getApiBaseUrl()}/courses/${courseId}/instructor/api/delete_allowance/${allowanceId}`
  );
};

export const editAllowance = async (courseId: string, allowanceId: number, updatedAllowance: Partial<AddAllowanceParams>): Promise<Allowance> => {
  const { data } = await getAuthenticatedHttpClient().patch(
    `${getApiBaseUrl()}/courses/${courseId}/instructor/api/edit_allowance/${allowanceId}`,
    updatedAllowance
  );
  return camelCaseObject(data);
};
