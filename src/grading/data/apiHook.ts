import { useQuery } from '@tanstack/react-query';
import { getLearnerGrading } from './api';
import { gradingQueryKeys } from './queryKeys';

export const useLearnerGrading = (courseId: string, emailOrUsername: string) => (
  useQuery({
    queryKey: gradingQueryKeys.learnerGrading(courseId, emailOrUsername),
    queryFn: () => getLearnerGrading(courseId, emailOrUsername),
    enabled: !!courseId && !!emailOrUsername,
  }));
