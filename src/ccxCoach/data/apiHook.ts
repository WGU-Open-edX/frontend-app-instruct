import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCcxCoachCourse, getCcxCoachInfo } from './api';
import { ccxCoachInfoQueryKeys } from './queryKeys';

export const useCcxCoachInfo = (courseId: string) => (
  useQuery({
    queryKey: ccxCoachInfoQueryKeys.byCourse(courseId),
    queryFn: () => getCcxCoachInfo(courseId),
    enabled: !!courseId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  })
);

export const useCreateCcxCoachCourse = (courseId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => createCcxCoachCourse(courseId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ccxCoachInfoQueryKeys.byCourse(courseId),
        exact: false,
      });
    },
  });
};
