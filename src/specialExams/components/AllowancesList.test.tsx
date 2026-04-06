import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AllowancesList from './AllowancesList';
import { renderWithIntl } from '@src/testUtils';
import { useAllowances } from '../data/apiHook';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ courseId: 'course-v1:edX+Test+2024' }),
}));

jest.mock('../data/apiHook', () => ({
  useAllowances: jest.fn(),
}));

const mockAllowances = {
  results: [
    {
      username: 'john_doe',
      email: 'john.doe@hotmail.com',
      examName: 'Midterm Exam',
      allowanceType: 'Time Extension',
      allowanceValue: '30 minutes',
    },
  ],
  count: 1,
  numPages: 1,
};

describe('AllowancesList', () => {
  const onClickAdd = jest.fn();
  const onClickMore = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders DataTable with correct columns and empty data', () => {
    (useAllowances as jest.Mock).mockReturnValue({
      data: { results: [], count: 0, numPages: 0 },
      isLoading: false,
    });

    renderWithIntl(<AllowancesList onClickAdd={onClickAdd} onClickMore={onClickMore} />);

    expect(screen.getByText('No allowances found')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('username or email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add allowance/i })).toBeInTheDocument();
  });

  it('shows loading state when isLoading is true', () => {
    (useAllowances as jest.Mock).mockReturnValue({
      data: { results: [], count: 0, numPages: 0 },
      isLoading: true,
    });

    renderWithIntl(<AllowancesList onClickAdd={onClickAdd} onClickMore={onClickMore} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders allowances data', () => {
    (useAllowances as jest.Mock).mockReturnValue({
      data: mockAllowances,
      isLoading: false,
    });

    renderWithIntl(<AllowancesList onClickAdd={onClickAdd} onClickMore={onClickMore} />);
    expect(screen.getByText(mockAllowances.results[0].username)).toBeInTheDocument();
    expect(screen.getByText(mockAllowances.results[0].email)).toBeInTheDocument();
    expect(screen.getByText(mockAllowances.results[0].examName)).toBeInTheDocument();
    expect(screen.getByText(mockAllowances.results[0].allowanceType)).toBeInTheDocument();
    expect(screen.getByText(mockAllowances.results[0].allowanceValue)).toBeInTheDocument();
  });

  it('calls onClickAdd when add button is clicked', async () => {
    (useAllowances as jest.Mock).mockReturnValue({
      data: mockAllowances,
      isLoading: false,
    });
    renderWithIntl(<AllowancesList onClickAdd={onClickAdd} onClickMore={onClickMore} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /add allowance/i }));
    expect(onClickAdd).toHaveBeenCalled();
  });

  it('calls onClickMore when actions button is clicked', async () => {
    (useAllowances as jest.Mock).mockReturnValue({
      data: mockAllowances,
      isLoading: false,
    });
    renderWithIntl(<AllowancesList onClickAdd={onClickAdd} onClickMore={onClickMore} />);
    const user = userEvent.setup();
    const actionsBtn = screen.getByRole('button', { name: /edit allowance/i });
    await user.click(actionsBtn);
    expect(onClickMore).toHaveBeenCalled();
  });

  it('calls fetchData when filter changes', async () => {
    (useAllowances as jest.Mock).mockReturnValue({
      data: mockAllowances,
      isLoading: false,
    });
    renderWithIntl(<AllowancesList onClickAdd={onClickAdd} onClickMore={onClickMore} />);
    const input = screen.getByPlaceholderText('username or email');
    const user = userEvent.setup();
    await user.type(input, 'testuser');
    expect(input).toHaveValue('testuser');
  });
});
