export const gradingQueryKeys = {
  all: ['grading'] as const,
  learnerGrading: (courseId: string, emailOrUsername: string) => [...gradingQueryKeys.all, 'learnerGrading', courseId, emailOrUsername] as const,
};
