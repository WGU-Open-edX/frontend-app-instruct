import { useState } from 'react';
import { useIntl } from '@openedx/frontend-base';
import { Button, FormControl, FormGroup, FormLabel, Stack } from '@openedx/paragon';
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
    <FormGroup className="pt-2 col-12 col-md-7" size="sm">
      <FormLabel className="text-primary-500" htmlFor="newCCXCourse">{intl.formatMessage(messages.newCCXCourseLabel)}</FormLabel>
      <Stack direction="horizontal" gap={2} className="align-items-center">
        <FormControl
          name="newCCXCourse"
          placeholder={intl.formatMessage(messages.newCCXCoursePlaceholder)}
          size="md"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button disabled={!inputValue}>{intl.formatMessage(messages.createCCXCourseButton)}</Button>
      </Stack>
    </FormGroup>
  );
};

export default NewCCXCourse;
