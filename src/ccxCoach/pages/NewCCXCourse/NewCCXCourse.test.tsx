import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithIntl } from '@src/testUtils';
import NewCCXCourse from './NewCCXCourse';
import messages from './messages';

describe('NewCCXCourse', () => {
  it('renders the label, input and create button', () => {
    renderWithIntl(<NewCCXCourse />);

    expect(screen.getByLabelText(messages.newCCXCourseLabel.defaultMessage)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(messages.newCCXCoursePlaceholder.defaultMessage)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: messages.createCCXCourseButton.defaultMessage })
    ).toBeInTheDocument();
  });

  it('disables the create button when the input is empty', () => {
    renderWithIntl(<NewCCXCourse />);

    expect(
      screen.getByRole('button', { name: messages.createCCXCourseButton.defaultMessage })
    ).toBeDisabled();
  });

  it('enables the create button once the user types a name', async () => {
    renderWithIntl(<NewCCXCourse />);
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText(messages.newCCXCoursePlaceholder.defaultMessage);
    await user.type(input, 'My CCX');

    expect(input).toHaveValue('My CCX');
    expect(
      screen.getByRole('button', { name: messages.createCCXCourseButton.defaultMessage })
    ).toBeEnabled();
  });

  it('disables the button again when the input is cleared', async () => {
    renderWithIntl(<NewCCXCourse />);
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText(messages.newCCXCoursePlaceholder.defaultMessage);
    await user.type(input, 'My CCX');
    await user.clear(input);

    expect(input).toHaveValue('');
    expect(
      screen.getByRole('button', { name: messages.createCCXCourseButton.defaultMessage })
    ).toBeDisabled();
  });
});
