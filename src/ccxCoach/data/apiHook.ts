import { useQuery } from '@tanstack/react-query';
import { getCcxCoachInfo } from './api';
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
