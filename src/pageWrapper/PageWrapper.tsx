import { useIntl } from '@openedx/frontend-base';
import { Container } from '@openedx/paragon';
import InstructorNav from '@src/instructorNav/InstructorNav';
import { AccessErrorGuard } from '@src/providers/AccessErrorProvider';
import AccessErrorObserver from '@src/providers/AccessErrorObserver';
import { useDashboardConfig } from '@src/dashboardConfig/DashboardConfigContext';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { formatMessage } = useIntl();
  const { headerMessage } = useDashboardConfig();
  return (
    <Container size="xl" fluid>
      <AccessErrorObserver />
      <h2 className="text-primary-700 m-4">{formatMessage(headerMessage)}</h2>
      <InstructorNav />
      <AccessErrorGuard>
        <div className="m-4">
          {children}
        </div>
      </AccessErrorGuard>
    </Container>
  );
};

export default PageWrapper;
