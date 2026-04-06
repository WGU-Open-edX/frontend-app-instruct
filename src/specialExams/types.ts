import { PaginationParams } from '@src/types';

export interface Attempt {
  username: string,
  examName: string,
  timeLimit: number,
  type: string,
  startedAt: string,
  completedAt: string,
  status: string,
}

export interface AttemptsParams extends PaginationParams {
  emailOrUsername: string,
}

export interface Allowance {
  username: string,
  email: string,
  examName: string,
  allowanceType: string,
  allowanceValue: string,
  examType: string,
}

export interface AddAllowanceParams extends Omit<Allowance, 'username' | 'email' | 'examName'> {
  emailOrUsername: string,
  exams: string[],
}
