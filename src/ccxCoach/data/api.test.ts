import { camelCaseObject, getAuthenticatedHttpClient, getSiteConfig } from '@openedx/frontend-base';
import { getCcxCoachInfo } from './api';

jest.mock('@openedx/frontend-base');

const mockBaseUrl = 'https://lms.example.com';

const mockHttpClient = {
  get: jest.fn(),
};

const mockGetSiteConfig = getSiteConfig as jest.MockedFunction<typeof getSiteConfig>;
const mockGetAuthenticatedHttpClient = getAuthenticatedHttpClient as jest.MockedFunction<typeof getAuthenticatedHttpClient>;
const mockCamelCaseObject = camelCaseObject as jest.MockedFunction<typeof camelCaseObject>;

describe('getCcxCoachInfo', () => {
  const mockData = {
    course_id: 'course-v1:edX+DemoX+Demo_Course',
    ccx_course_id: 'ccx-v1:edX+DemoX+Demo_Course+ccx@1',
    tabs: [],
  };
  const mockCamelCasedData = {
    courseId: 'course-v1:edX+DemoX+Demo_Course',
    ccxCourseId: 'ccx-v1:edX+DemoX+Demo_Course+ccx@1',
    tabs: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (mockGetSiteConfig as jest.Mock).mockReturnValue({ lmsBaseUrl: mockBaseUrl });
    mockGetAuthenticatedHttpClient.mockReturnValue(mockHttpClient as any);
    mockCamelCaseObject.mockReturnValue(mockCamelCasedData);
    mockHttpClient.get.mockResolvedValue({ data: mockData });
  });

  it('should fetch ccx coach info and return camelCased data', async () => {
    const courseId = 'course-v1:edX+DemoX+Demo_Course';

    const result = await getCcxCoachInfo(courseId);

    expect(getSiteConfig).toHaveBeenCalled();
    expect(mockHttpClient.get).toHaveBeenCalledWith(
      `${mockBaseUrl}/api/instructor/v2/ccx-coach/${courseId}/metadata`
    );
    expect(mockCamelCaseObject).toHaveBeenCalledWith(mockData);
    expect(result).toEqual(mockCamelCasedData);
  });

  it('should propagate errors from the HTTP client', async () => {
    const courseId = 'course-v1:edX+DemoX+Demo_Course';
    const mockError = new Error('Network error');
    mockHttpClient.get.mockRejectedValueOnce(mockError);

    await expect(getCcxCoachInfo(courseId)).rejects.toThrow('Network error');
  });
});
