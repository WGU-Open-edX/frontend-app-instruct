import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithIntl } from '@src/testUtils';
import EditTeamMemberModal from './EditTeamMemberModal';
import messages from '../messages';
import { CourseTeamMember } from '../types';
import { useRoles } from '../data/apiHook';

// Mocks
jest.mock('react-router-dom', () => ({
  useParams: () => ({ courseId: 'course-v1:test+course+run' }),
}));

jest.mock('../data/apiHook', () => ({
  useRoles: jest.fn(),
}));

const mockUser: CourseTeamMember = {
  username: 'test_user',
  fullName: 'Test User',
  email: 'test@example.com',
  roles: ['Staff', 'Admin'],
};

const mockRoles = [
  { id: 'instructor', name: 'Instructor' },
  { id: 'staff', name: 'Staff' },
  { id: 'admin', name: 'Admin' },
  { id: 'beta_testers', name: 'Beta Testers' },
  { id: 'data_researcher', name: 'Data Researcher' },
];

describe('EditTeamMemberModal', () => {
  const defaultProps = {
    isOpen: true,
    user: mockUser,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRoles as jest.Mock).mockReturnValue({ data: mockRoles });
  });

  it('renders modal with correct title', () => {
    renderWithIntl(<EditTeamMemberModal {...defaultProps} />);

    const expectedTitle = messages.editTeamTitle.defaultMessage.replace('{username}', mockUser.username);
    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
  });

  it('renders modal header and body correctly', () => {
    renderWithIntl(<EditTeamMemberModal {...defaultProps} />);

    const expectedTitle = messages.editTeamTitle.defaultMessage.replace('{username}', mockUser.username);
    expect(screen.getByText(expectedTitle)).toBeInTheDocument();

    // Check that header has correct styling
    const headerElement = screen.getByText(expectedTitle);
    expect(headerElement).toHaveClass('text-white');
  });

  it('renders edit instructions with username', () => {
    renderWithIntl(<EditTeamMemberModal {...defaultProps} />);

    const expectedInstructions = messages.editInstructions.defaultMessage.replace('{username}', mockUser.username);
    expect(screen.getByText(expectedInstructions)).toBeInTheDocument();
  });

  it('renders current user roles as checkboxes', () => {
    renderWithIntl(<EditTeamMemberModal {...defaultProps} />);

    mockUser.roles.forEach((role) => {
      expect(screen.getByRole('checkbox', { name: role })).toBeInTheDocument();
    });
  });

  it('renders add role label', () => {
    renderWithIntl(<EditTeamMemberModal {...defaultProps} />);

    expect(screen.getByText(messages.addRole.defaultMessage)).toBeInTheDocument();
  });

  it('renders role selection dropdown with filtered roles', () => {
    renderWithIntl(<EditTeamMemberModal {...defaultProps} />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    // Verify placeholder is present
    expect(screen.getByText(messages.rolePlaceholder.defaultMessage)).toBeInTheDocument();

    // Verify only roles not already assigned to user are available
    const availableRoles = mockRoles.filter(role => !mockUser.roles.includes(role.name));
    availableRoles.forEach((role) => {
      expect(screen.getByRole('option', { name: role.name })).toBeInTheDocument();
    });

    // Verify user's current roles are not in the dropdown options
    mockUser.roles.forEach((roleName) => {
      const roleInMockData = mockRoles.find(role => role.name === roleName);
      if (roleInMockData) {
        expect(screen.queryByRole('option', { name: roleName })).not.toBeInTheDocument();
      }
    });
  });

  it('renders cancel and save buttons', () => {
    renderWithIntl(<EditTeamMemberModal {...defaultProps} />);

    expect(screen.getByRole('button', { name: messages.cancelButton.defaultMessage })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: messages.saveButton.defaultMessage })).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', async () => {
    const mockOnClose = jest.fn();
    renderWithIntl(<EditTeamMemberModal {...defaultProps} onClose={mockOnClose} />);

    const user = userEvent.setup();
    const cancelButton = screen.getByRole('button', { name: messages.cancelButton.defaultMessage });
    await user.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when save button is clicked', async () => {
    const mockOnClose = jest.fn();
    renderWithIntl(<EditTeamMemberModal {...defaultProps} onClose={mockOnClose} />);

    const user = userEvent.setup();
    const saveButton = screen.getByRole('button', { name: messages.saveButton.defaultMessage });
    await user.click(saveButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not render when isOpen is false', () => {
    renderWithIntl(<EditTeamMemberModal {...defaultProps} isOpen={false} />);

    const expectedTitle = messages.editTeamTitle.defaultMessage.replace('{username}', mockUser.username);
    expect(screen.queryByText(expectedTitle)).not.toBeInTheDocument();
  });

  it('renders correctly when no roles data is available', () => {
    (useRoles as jest.Mock).mockReturnValue({ data: [] });
    renderWithIntl(<EditTeamMemberModal {...defaultProps} />);

    // Should only show placeholder in dropdown
    expect(screen.getByText(messages.rolePlaceholder.defaultMessage)).toBeInTheDocument();

    // Select should be disabled when no roles are available
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeDisabled();

    // Should still show current user roles as checkboxes
    mockUser.roles.forEach((role) => {
      expect(screen.getByRole('checkbox', { name: role })).toBeInTheDocument();
    });
  });

  it('renders correctly when useRoles returns undefined data', () => {
    (useRoles as jest.Mock).mockReturnValue({ data: undefined });
    renderWithIntl(<EditTeamMemberModal {...defaultProps} />);

    // Should only show placeholder in dropdown
    expect(screen.getByText(messages.rolePlaceholder.defaultMessage)).toBeInTheDocument();

    // Select should be disabled when no roles are available
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeDisabled();

    // Should still show current user roles as checkboxes
    mockUser.roles.forEach((role) => {
      expect(screen.getByRole('checkbox', { name: role })).toBeInTheDocument();
    });
  });

  it('handles user with all available roles assigned', () => {
    const userWithAllRoles = {
      ...mockUser,
      roles: mockRoles.map(role => role.name),
    };
    renderWithIntl(<EditTeamMemberModal {...defaultProps} user={userWithAllRoles} />);

    // Should show all roles as checkboxes
    userWithAllRoles.roles.forEach((role) => {
      expect(screen.getByRole('checkbox', { name: role })).toBeInTheDocument();
    });

    // Dropdown should only have placeholder since all roles are assigned
    expect(screen.getByText(messages.rolePlaceholder.defaultMessage)).toBeInTheDocument();
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(1); // Only placeholder option
  });

  it('shows select role placeholder in dropdown', () => {
    renderWithIntl(<EditTeamMemberModal {...defaultProps} />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveAttribute('placeholder', messages.rolePlaceholder.defaultMessage);
  });

  it('enables select when roles are available for assignment', () => {
    renderWithIntl(<EditTeamMemberModal {...defaultProps} />);

    // Should be enabled when there are roles available to assign
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).not.toBeDisabled();
  });
});
