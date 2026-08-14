import { appId } from '@src/constants';

export const ccxCoachInfoQueryKeys = {
  all: [appId, 'ccxCoachInfo'] as const,
  byCourse: (courseId: string) => [appId, 'ccxCoachInfo', courseId] as const,
};
