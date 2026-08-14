import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDashboardConfig } from '@src/dashboardConfig/DashboardConfigContext';
import { isForbiddenError, isUnauthorizedError } from '@src/data/utils';
import { useAccessError } from '@src/providers/AccessErrorProvider';

/**
 * Observes the current variant's tabs-info query and syncs 401/403 errors
 * with the AccessErrorProvider. Must be rendered inside both
 * DashboardConfigProvider and AccessErrorProvider.
 */
const AccessErrorObserver = () => {
  const { courseId = '' } = useParams<{ courseId: string }>();
  const { useTabsInfo } = useDashboardConfig();
  const { isLoading, error } = useTabsInfo(courseId);
  const { setErrorType, setLoading } = useAccessError();

  useEffect(() => {
    setLoading(isLoading);
    if (error && isForbiddenError(error)) {
      setErrorType('forbidden');
    } else if (error && isUnauthorizedError(error)) {
      setErrorType('unauthorized');
    } else if (error) {
      setErrorType('generic');
    } else {
      setErrorType(null);
    }
  }, [isLoading, error, setErrorType, setLoading]);

  return null;
};

export default AccessErrorObserver;
