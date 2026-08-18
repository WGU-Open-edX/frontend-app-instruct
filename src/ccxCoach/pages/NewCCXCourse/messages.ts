import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  newCCXCourseLabel: {
    id: 'newCCXCourse.label',
    defaultMessage: 'Name Your CCX',
    description: 'Label for the input field to enter the name of a new CCX course in the New CCX Course page',
  },
  newCCXCoursePlaceholder: {
    id: 'newCCXCourse.placeholder',
    defaultMessage: 'Enter CCX Name',
    description: 'Placeholder text for the CCX name input field in the New CCX Course page',
  },
  createCCXCourseButton: {
    id: 'newCCXCourse.createButton',
    defaultMessage: 'Create Custom Course',
    description: 'Text for the button to create a new CCX course in the New CCX Course page',
  },
  closeButton: {
    id: 'newCCXCourse.closeButton',
    defaultMessage: 'Close',
    description: 'Close button for error modal'
  },
  createError: {
    id: 'newCCXCourse.createError',
    defaultMessage: 'An error occurred while creating the new CCX course. Please try again.',
    description: 'Error message shown when creating a new CCX course fails'
  }
});

export default messages;
