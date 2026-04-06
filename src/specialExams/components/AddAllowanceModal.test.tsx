import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddAllowanceModal from './AddAllowanceModal';
import { renderWithIntl } from '@src/testUtils';
import messages from '../messages';

const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  onAdd: jest.fn(),
};

describe('AddAllowanceModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal with all fields', () => {
    renderWithIntl(<AddAllowanceModal {...defaultProps} />);
    expect(screen.getByText(messages.addAllowance.defaultMessage)).toBeInTheDocument();
    expect(screen.getByLabelText(new RegExp(messages.specifyLearners.defaultMessage))).toBeInTheDocument();
    expect(screen.getByLabelText(new RegExp(messages.selectExamType.defaultMessage))).toBeInTheDocument();
    expect(screen.getByLabelText(new RegExp(messages.selectAllowanceType.defaultMessage))).toBeInTheDocument();
    expect(screen.getByLabelText(new RegExp(messages.addTime.defaultMessage))).toBeInTheDocument();
    expect(screen.getByRole('button', { name: messages.cancel.defaultMessage })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: messages.createAllowance.defaultMessage })).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', async () => {
    renderWithIntl(<AddAllowanceModal {...defaultProps} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: messages.cancel.defaultMessage }));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onAdd when form is submitted', async () => {
    renderWithIntl(<AddAllowanceModal {...defaultProps} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: messages.createAllowance.defaultMessage }));
    expect(defaultProps.onAdd).toHaveBeenCalled();
  });

  it('does not render when isOpen is false', () => {
    renderWithIntl(<AddAllowanceModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText(messages.addAllowance.defaultMessage)).not.toBeInTheDocument();
  });
});
