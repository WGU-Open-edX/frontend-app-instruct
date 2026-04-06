import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Allowances from './Allowances';
import { renderWithIntl } from '@src/testUtils';
import * as apiHook from '../data/apiHook';
import messages from '../messages';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ courseId: 'course-v1:edX+Test+2024' }),
}));

jest.mock('../data/apiHook');

describe('Allowances', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (apiHook.useAllowances as jest.Mock).mockReturnValue({
      data: { results: [], count: 0, numPages: 0 },
      isLoading: false,
    });
    (apiHook.useAddAllowance as jest.Mock).mockReturnValue({ mutate: jest.fn() });
    (apiHook.useEditAllowance as jest.Mock).mockReturnValue({ mutate: jest.fn() });
  });

  it('renders AllowancesList and AddAllowanceModal', () => {
    renderWithIntl(<Allowances />);
    expect(screen.getByText('No allowances found')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add allowance/i })).toBeInTheDocument();
  });

  it('opens AddAllowanceModal when add button is clicked', async () => {
    renderWithIntl(<Allowances />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /add allowance/i }));
    expect(screen.getByText('Add Allowance')).toBeInTheDocument();
  });

  it('opens EditAllowanceModal when onClickMore and Edit is clicked', async () => {
    (apiHook.useAllowances as jest.Mock).mockReturnValue({
      data: {
        results: [
          {
            username: 'john_doe',
            email: 'john.doe@hotmail.com',
            examName: 'Midterm Exam',
            allowanceType: 'Time Extension',
            allowanceValue: '30 minutes',
            examType: 'proctored',
          },
        ],
        count: 1,
        numPages: 1,
      },
      isLoading: false,
    });
    renderWithIntl(<Allowances />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: messages.actions.defaultMessage }));
    const editBtn = screen.getByText('Edit');
    await user.click(editBtn);
    expect(screen.getByRole('dialog', { name: messages.editAllowance.defaultMessage })).toBeInTheDocument();
  });

  it('closes EditAllowanceModal when onClose is called', async () => {
    (apiHook.useAllowances as jest.Mock).mockReturnValue({
      data: {
        results: [
          {
            username: 'john_doe',
            email: 'john.doe@hotmail.com',
            examName: 'Midterm Exam',
            allowanceType: 'Time Extension',
            allowanceValue: '30 minutes',
            examType: 'proctored',
          },
        ],
        count: 1,
        numPages: 1,
      },
      isLoading: false,
    });
    renderWithIntl(<Allowances />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: messages.actions.defaultMessage }));
    const editBtn = screen.getByText('Edit');
    await user.click(editBtn);
    await user.click(screen.getByRole('button', { name: messages.cancel.defaultMessage }));
    expect(screen.queryByRole('dialog', { name: messages.editAllowance.defaultMessage })).not.toBeInTheDocument();
  });
});
