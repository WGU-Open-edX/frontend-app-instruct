import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addAllowance, deleteAllowance, editAllowance, getAllowances, getAttempts } from './api';
import { specialExamsQueryKeys } from './queryKeys';
import { AddAllowanceParams, AttemptsParams } from '../types';

export const useAttempts = (courseId: string, params: AttemptsParams) => (
  useQuery({
    queryKey: specialExamsQueryKeys.attempts(courseId, params),
    queryFn: () => getAttempts(courseId, params),
    enabled: !!courseId,
  })
);

export const useAllowances = (courseId: string, params: AttemptsParams) => (
  useQuery({
    queryKey: specialExamsQueryKeys.allowances(courseId, params),
    queryFn: () => getAllowances(courseId, params),
    enabled: !!courseId,
  })
);

export const useAddAllowance = (courseId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ newAllowance }: { newAllowance: AddAllowanceParams }) =>
      addAllowance(courseId, newAllowance),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: specialExamsQueryKeys.allowances(courseId) });
    },
  });
};

export const useDeleteAllowance = (courseId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (allowanceId: number) => deleteAllowance(courseId, allowanceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: specialExamsQueryKeys.allowances(courseId) });
    },
  });
};

export const useEditAllowance = (courseId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ allowanceId, updatedAllowance }: { allowanceId: number, updatedAllowance: Partial<AddAllowanceParams> }) =>
      editAllowance(courseId, allowanceId, updatedAllowance),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: specialExamsQueryKeys.allowances(courseId) });
    },
  });
};
