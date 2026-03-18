import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithIntl } from '@src/testUtils';
import { useTeamMembers } from '../data/apiHook';
import MembersContent from './MembersContent';
import messages from '../messages';

const courseId = 'course-v1:edX+DemoX+Demo_Course';

jest.mock('../data/apiHook', () => ({
  useTeamMembers: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ courseId: courseId }),
}));

const mockTeamMembers = [
  { username: 'user1', fullName: 'User One', email: 'user1@example.com', roles: ['Admin'] },
  { username: 'user2', fullName: 'User Two', email: 'user2@example.com', roles: ['Staff'] },
];

const mockOnEdit = jest.fn();

const renderComponent = () => renderWithIntl(<MembersContent onEdit={mockOnEdit} />);

describe('MembersContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    (useTeamMembers as jest.Mock).mockReturnValue({
      data: { results: [], numPages: 1, count: 0 },
      isLoading: true,
    });

    renderComponent();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders team members data correctly', () => {
    (useTeamMembers as jest.Mock).mockReturnValue({
      data: { results: mockTeamMembers, numPages: 1, count: 2 },
      isLoading: false,
    });

    renderComponent();

    expect(screen.getByText(mockTeamMembers[0].username)).toBeInTheDocument();
    expect(screen.getByText(mockTeamMembers[0].email)).toBeInTheDocument();
    expect(screen.getByText(mockTeamMembers[0].roles.join(', '))).toBeInTheDocument();
    expect(screen.getByText(mockTeamMembers[1].username)).toBeInTheDocument();
    expect(screen.getByText(mockTeamMembers[1].email)).toBeInTheDocument();
    expect(screen.getByText(mockTeamMembers[1].roles.join(', '))).toBeInTheDocument();
  });

  it('renders empty state when no team members', () => {
    (useTeamMembers as jest.Mock).mockReturnValue({
      data: { results: [], numPages: 1, count: 0 },
      isLoading: false,
    });

    renderComponent();
    expect(screen.getByText(messages.noTeamMembers.defaultMessage)).toBeInTheDocument();
  });

  it('calls useTeamMembers with correct parameters', () => {
    (useTeamMembers as jest.Mock).mockReturnValue({
      data: { results: [], numPages: 1, count: 0 },
      isLoading: false,
    });

    renderComponent();

    expect(useTeamMembers).toHaveBeenCalledWith(courseId, {
      page: 0,
      emailOrUsername: '',
      role: '',
      pageSize: 25,
    });
  });

  it('handles pagination correctly', async () => {
    (useTeamMembers as jest.Mock).mockReturnValue({
      data: { results: mockTeamMembers, numPages: 3, count: 50 },
      isLoading: false,
    });

    renderComponent();

    const nextPageButton = screen.getByLabelText(/next/i);
    const user = userEvent.setup();
    await user.click(nextPageButton);

    expect(useTeamMembers).toHaveBeenLastCalledWith(courseId, {
      page: 1,
      emailOrUsername: '',
      role: '',
      pageSize: 25,
    });
  });

  it('renders action buttons for each row', () => {
    (useTeamMembers as jest.Mock).mockReturnValue({
      data: { results: mockTeamMembers, numPages: 1, count: 2 },
      isLoading: false,
    });

    renderComponent();

    const editButtons = screen.getAllByText(messages.edit.defaultMessage);
    expect(editButtons).toHaveLength(2);
  });

  it('renders table headers correctly', () => {
    (useTeamMembers as jest.Mock).mockReturnValue({
      data: { results: mockTeamMembers, numPages: 1, count: 2 },
      isLoading: false,
    });

    renderComponent();

    expect(screen.getByText(messages.username.defaultMessage)).toBeInTheDocument();
    expect(screen.getByText(messages.email.defaultMessage)).toBeInTheDocument();
    expect(screen.getByText(messages.role.defaultMessage)).toBeInTheDocument();
    expect(screen.getByText(messages.actions.defaultMessage)).toBeInTheDocument();
  });
});
