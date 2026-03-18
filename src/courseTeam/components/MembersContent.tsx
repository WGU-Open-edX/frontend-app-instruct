import { useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useIntl } from '@openedx/frontend-base';
import { Button, DataTable } from '@openedx/paragon';
import messages from '../messages';
import { useTeamMembers } from '../data/apiHook';
import { CourseTeamMember } from '../types';

const TEAM_MEMBERS_PAGE_SIZE = 25;

interface MembersContentProps {
  onEdit: (user: CourseTeamMember) => void,
}

const MembersContent = ({ onEdit }: MembersContentProps) => {
  const intl = useIntl();
  const { courseId = '' } = useParams<{ courseId: string }>();
  const [filters, setFilters] = useState({ page: 0, emailOrUsername: '', role: '' });
  const { data: { results: teamMembers = [], numPages = 1, count = 0 } = {}, isLoading = false } = useTeamMembers(courseId, { ...filters, pageSize: TEAM_MEMBERS_PAGE_SIZE });

  const tableColumns = useMemo(() => [
    { accessor: 'username', Header: intl.formatMessage(messages.username) },
    { accessor: 'email', Header: intl.formatMessage(messages.email) },
    { accessor: 'roles', Header: intl.formatMessage(messages.role), Cell: ({ cell: { value } }: { cell: { value: string[] } }) => value.join(', ') },
  ], [intl]);

  const additionalColumns = useMemo(() => [{
    id: 'actions',
    Header: intl.formatMessage(messages.actions),
    Cell: ({ row }: { row: { original: any } }) => (
      <Button variant="link" size="inline" onClick={() => onEdit(row.original)}>
        {intl.formatMessage(messages.edit)}
      </Button>
    )
  }], [intl, onEdit]);

  const handleFetchData = useCallback(({ pageIndex, filters: tableFilters }: { pageIndex: number, filters: { id: string, value: string }[] }) => {
    // Filters will be handled in a future iteration, for now we will just update pagination
    console.log(pageIndex, tableFilters);
    if (pageIndex !== filters.page) {
      setFilters(prevFilters => ({
        ...prevFilters,
        page: pageIndex,
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableState = useMemo(() => ({
    pageIndex: filters.page,
    pageSize: TEAM_MEMBERS_PAGE_SIZE,
  }), [filters.page]);

  return (
    <DataTable
      additionalColumns={additionalColumns}
      columns={tableColumns}
      data={teamMembers}
      fetchData={handleFetchData}
      state={tableState}
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
  );
};

export default MembersContent;
