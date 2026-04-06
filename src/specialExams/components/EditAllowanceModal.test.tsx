import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditAllowanceModal from './EditAllowanceModal';
import { renderWithIntl } from '@src/testUtils';
import * as apiHook from '../data/apiHook';
import messages from '../messages';

const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  allowance: {
    username: 'john_doe',
    email: 'john.doe@hotmail.com',
    examName: 'Midterm Exam',
    allowanceType: 'Time Extension',
    allowanceValue: '30 minutes',
    examType: 'proctored',
  },
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ courseId: 'course-v1:edX+Test+2024' }),
}));

jest.mock('../data/apiHook');

describe('EditAllowanceModal', () => {
  const mutate = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (apiHook.useEditAllowance as jest.Mock).mockReturnValue({ mutate });
  });

  it('renders modal with all fields', () => {
    renderWithIntl(<EditAllowanceModal {...defaultProps} />);
    expect(screen.getByRole('heading', { name: messages.editAllowance.defaultMessage })).toBeInTheDocument();
    expect(screen.getByLabelText(new RegExp(messages.selectExamType.defaultMessage))).toBeInTheDocument();
    expect(screen.getByLabelText(new RegExp(messages.selectAllowanceType.defaultMessage))).toBeInTheDocument();
    expect(screen.getByLabelText(new RegExp(messages.addTime.defaultMessage))).toBeInTheDocument();
    expect(screen.getByRole('button', { name: messages.cancel.defaultMessage })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: messages.editAllowance.defaultMessage })).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', async () => {
    renderWithIntl(<EditAllowanceModal {...defaultProps} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: messages.cancel.defaultMessage }));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls mutate when form is submitted', async () => {
    renderWithIntl(<EditAllowanceModal {...defaultProps} />);
    const user = userEvent.setup();
    const editBtn = screen.getByRole('button', { name: messages.editAllowance.defaultMessage });
    await user.click(editBtn);
    expect(mutate).toHaveBeenCalled();
  });

  it('does not render when isOpen is false', () => {
    renderWithIntl(<EditAllowanceModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText(messages.editAllowance.defaultMessage)).not.toBeInTheDocument();
  });
});
