import { useState, useRef } from 'react';
import { useIntl } from '@openedx/frontend-base';
import { Button, DataTable, IconButton } from '@openedx/paragon';
import { useAllowances } from '../data/apiHook';
import { DataTableFetchDataProps, TableCellValue } from '@src/types';
import { useParams } from 'react-router-dom';
import UsernameFilter from './UsernameFilter';
import { MoreVert } from '@openedx/paragon/icons';
import messages from '../messages';
import { Allowance } from '../types';

const ALLOWANCES_PAGE_SIZE = 25;

interface AllowanceList {
  onClickAdd: () => void,
  onClickMore: (allowance: Allowance, menuTarget: HTMLElement) => void,
}

const mock = [
  {
    username: 'john_doe',
    email: 'john.doe@hotmail.com',
    examName: 'Midterm Exam',
    allowanceType: 'Time Extension',
    allowanceValue: '30 minutes',
  }
];

const AllowancesList = ({ onClickAdd, onClickMore }: AllowanceList) => {
  const intl = useIntl();
  const { courseId = '' } = useParams<{ courseId: string }>();
  const [filters, setFilters] = useState({ page: 0, emailOrUsername: '' });
  const { data = { results: mock, count: 0, numPages: 1 }, isLoading = false } = useAllowances(courseId, {
    pageSize: ALLOWANCES_PAGE_SIZE,
    ...filters,
  });

  const columns = [
    { accessor: 'username', Header: intl.formatMessage(messages.username), Filter: UsernameFilter, },
    { accessor: 'email', Header: intl.formatMessage(messages.email), disableFilters: true, },
    { accessor: 'examName', Header: intl.formatMessage(messages.examName), disableFilters: true, },
    { accessor: 'allowanceType', Header: intl.formatMessage(messages.allowanceType), disableFilters: true, },
    { accessor: 'allowanceValue', Header: intl.formatMessage(messages.allowanceValue), disableFilters: true, },
  ];

  const additionalColumns = [{
    id: 'actions',
    Header: '',
    Cell: ({ row: { original } }: TableCellValue<Allowance>) => {
      const btnRef = useRef<HTMLButtonElement>(null);
      return (
        <>
          <IconButton
            ref={btnRef}
            alt={intl.formatMessage(messages.actions)}
            className="lead"
            iconAs={MoreVert}
            onClick={() => onClickMore(original, btnRef.current!)}
          />
        </>
      );
    },
  }];

  const handleFetchData = (data: DataTableFetchDataProps) => {
    const emailOrUsernameFilter = data.filters?.find((f) => f.id === 'username');
    if (emailOrUsernameFilter && emailOrUsernameFilter.value !== filters.emailOrUsername) {
      setFilters((prevFilters) => ({ ...prevFilters, emailOrUsername: emailOrUsernameFilter.value, page: 0 }));
      return;
    }
    if (data.pageIndex !== filters.page) {
      setFilters((prevFilters) => ({ ...prevFilters, page: data.pageIndex }));
    }
  };

  return (
    <DataTable
      additionalColumns={additionalColumns}
      className="mt-3"
      columns={columns}
      data={data.results}
      state={{
        pageIndex: filters.page,
        pageSize: ALLOWANCES_PAGE_SIZE,
        filters: [
          { id: 'emailOrUsername', value: filters.emailOrUsername }
        ]
      }}
      fetchData={handleFetchData}
      isFilterable
      isLoading={isLoading}
      isPaginated
      isSortable
      itemCount={data.count}
      manualFilters
      manualPagination
      manualSortBy
      pageSize={ALLOWANCES_PAGE_SIZE}
      pageCount={data.numPages}
      FilterStatusComponent={() => null}
    >
      <div className="bg-light-200 d-flex justify-content-between align-items-center p-3">
        <DataTable.TableControlBar className="p-0" />
        <Button variant="primary" onClick={onClickAdd}>
          + {intl.formatMessage(messages.addAllowance)}
        </Button>
      </div>
      <DataTable.Table />
      <DataTable.EmptyTable content={intl.formatMessage(messages.noAllowances)} />
      <DataTable.TableFooter />
    </DataTable>
  );
};

export default AllowancesList;
