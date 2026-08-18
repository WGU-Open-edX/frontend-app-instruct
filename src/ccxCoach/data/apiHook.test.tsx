import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createCcxCoachCourse, getCcxCoachInfo } from './api';
import { useCcxCoachInfo, useCreateCcxCoachCourse } from './apiHook';
import { ccxCoachInfoQueryKeys } from './queryKeys';

jest.mock('./api');

const mockGetCcxCoachInfo = getCcxCoachInfo as jest.MockedFunction<typeof getCcxCoachInfo>;
const mockCreateCcxCoachCourse = createCcxCoachCourse as jest.MockedFunction<typeof createCcxCoachCourse>;

const mockCcxCoachData = {
  courseId: 'course-v1:edX+DemoX+Demo_Course',
  ccxCourseId: 'ccx-v1:edX+DemoX+Demo_Course+ccx@1',
  tabs: [],
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = 'TestWrapper';
  return Wrapper;
};

describe('useCcxCoachInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches ccx coach info successfully', async () => {
    mockGetCcxCoachInfo.mockResolvedValue(mockCcxCoachData);

    const { result } = renderHook(() => useCcxCoachInfo('course-v1:edX+DemoX+Demo_Course'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockGetCcxCoachInfo).toHaveBeenCalledWith('course-v1:edX+DemoX+Demo_Course');
    expect(result.current.data).toBe(mockCcxCoachData);
    expect(result.current.error).toBe(null);
  });

  it('handles API error', async () => {
    const mockError = new Error('API Error');
    mockGetCcxCoachInfo.mockRejectedValue(mockError);

    const { result } = renderHook(() => useCcxCoachInfo('course-v1:edX+DemoX+Demo_Course'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockGetCcxCoachInfo).toHaveBeenCalledWith('course-v1:edX+DemoX+Demo_Course');
    expect(result.current.error).toBe(mockError);
    expect(result.current.data).toBe(undefined);
  });

  it('is disabled when courseId is empty', () => {
    const { result } = renderHook(() => useCcxCoachInfo(''), {
      wrapper: createWrapper(),
    });

    expect(mockGetCcxCoachInfo).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(undefined);
  });
});

describe('useCreateCcxCoachCourse', () => {
  const courseId = 'course-v1:edX+DemoX+Demo_Course';
  const ccxCourseName = 'My New CCX';
  const mockCreatedData = {
    ccxCourseId: 'ccx-v1:edX+DemoX+Demo_Course+ccx@1',
  };

  const createWrapperWithClient = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    Wrapper.displayName = 'TestWrapperWithClient';
    return { Wrapper, queryClient };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls createCcxCoachCourse with the given course id and name on mutate', async () => {
    mockCreateCcxCoachCourse.mockResolvedValue(mockCreatedData as any);
    const { Wrapper } = createWrapperWithClient();

    const { result } = renderHook(() => useCreateCcxCoachCourse(courseId), {
      wrapper: Wrapper,
    });

    result.current.mutate(ccxCourseName);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockCreateCcxCoachCourse).toHaveBeenCalledWith(courseId, ccxCourseName);
    expect(result.current.data).toEqual(mockCreatedData);
  });

  it('invalidates the ccxCoachInfo query for the course on success', async () => {
    mockCreateCcxCoachCourse.mockResolvedValue(mockCreatedData as any);
    const { Wrapper, queryClient } = createWrapperWithClient();
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useCreateCcxCoachCourse(courseId), {
      wrapper: Wrapper,
    });

    result.current.mutate(ccxCourseName);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ccxCoachInfoQueryKeys.byCourse(courseId),
      exact: false,
    });
  });

  it('surfaces API errors through the mutation state', async () => {
    const mockError = new Error('Create failed');
    mockCreateCcxCoachCourse.mockRejectedValue(mockError);
    const { Wrapper, queryClient } = createWrapperWithClient();
    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useCreateCcxCoachCourse(courseId), {
      wrapper: Wrapper,
    });

    result.current.mutate(ccxCourseName);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBe(mockError);
    expect(invalidateSpy).not.toHaveBeenCalled();
  });
});
