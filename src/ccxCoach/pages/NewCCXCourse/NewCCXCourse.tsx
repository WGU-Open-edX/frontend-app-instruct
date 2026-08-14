import { useState } from 'react';
import { useIntl } from '@openedx/frontend-base';
import { Button, FormControl, FormGroup, FormLabel } from '@openedx/paragon';
import { useDebouncedFilter } from '@src/hooks/useDebouncedFilter';
import messages from './messages';

const NewCCXCourse = () => {
  const intl = useIntl();
  const [newCCXCourseName, setNewCCXCourseName] = useState('');
  const { inputValue, handleChange } = useDebouncedFilter({
    filterValue: newCCXCourseName,
    setFilter: setNewCCXCourseName,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value);
  };

  return (
    <FormGroup className="pt-2" size="sm">
      <FormLabel className="text-primary-500" htmlFor="newCCXCourse">{intl.formatMessage(messages.newCCXCourseLabel)}</FormLabel>
      <div className="d-flex align-items-center">
        <FormControl
          autoResize
          onChange={handleInputChange}
          size="md"
          value={inputValue}
          name="newCCXCourse"
          placeholder={intl.formatMessage(messages.newCCXCoursePlaceholder)}
        />
        <Button disabled={!inputValue}>{intl.formatMessage(messages.createCCXCourseButton)}</Button>
      </div>
    </FormGroup>
  );
};

export default NewCCXCourse;
