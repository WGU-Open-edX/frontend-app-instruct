import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIntl } from '@openedx/frontend-base';
import { Button, DataTable } from '@openedx/paragon';
import messages from '../messages';
import { useTeamMembers } from '../data/apiHook';

const TEAM_MEMBERS_PAGE_SIZE = 25;

const MembersContent = () => {
  const intl = useIntl();
  const { courseId = '' } = useParams<{ courseId: string }>();
  const [filters, setFilters] = useState({ page: 0, emailOrUsername: '', role: '' });
  const { data: { results: teamMembers = [], numPages = 1, count = 0 } = {}, isLoading = false } = useTeamMembers(courseId, { ...filters, pageSize: TEAM_MEMBERS_PAGE_SIZE });

  const tableColumns = [
    { accessor: 'username', Header: intl.formatMessage(messages.username) },
    { accessor: 'email', Header: intl.formatMessage(messages.email) },
    { accessor: 'role', Header: intl.formatMessage(messages.role) },
  ];

  const additionalColumns = [{
    id: 'actions',
    Header: intl.formatMessage(messages.actions),
    Cell: () => (
      <Button variant="link" size="inline">
        {intl.formatMessage(messages.edit)}
      </Button>
    )
  }];

  const handleFetchData = ({ pageIndex, filters: tableFilters }: { pageIndex: number, filters: { id: string, value: string }[] }) => {
    // Filters will be handled in a future iteration, for now we will just update pagination
    console.log(pageIndex, tableFilters);
    setFilters({
      page: pageIndex,
      emailOrUsername: '',
      role: '',
    });
  };

  return (
    <div>
      <DataTable
        additionalColumns={additionalColumns}
        columns={tableColumns}
        data={teamMembers}
        fetchData={handleFetchData}
        state={{
          pageIndex: filters.page,
          pageSize: TEAM_MEMBERS_PAGE_SIZE,
        }}
        isLoading={isLoading}
        isPaginated
        itemCount={count}
        manualFilters
        manualPagination
        pageSize={TEAM_MEMBERS_PAGE_SIZE}
        pageCount={numPages}
        RowStatusComponent={() => null}
      >
        <DataTable.TableControlBar />
        <DataTable.Table />
        <DataTable.EmptyTable content={intl.formatMessage(messages.noTeamMembers)} />
        <DataTable.TableFooter />
      </DataTable>
    </div>
  );
};

export default MembersContent;
