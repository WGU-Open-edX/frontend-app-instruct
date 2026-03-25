import { useIntl } from '@openedx/frontend-base';
import { FormControl, Icon } from '@openedx/paragon';
import { Search } from '@openedx/paragon/icons';
import { useDebouncedFilter } from '@src/hooks/useDebouncedFilter';
import messages from '../messages';

const UsernameFilter = ({ column: { filterValue, setFilter } }: { column: { filterValue: string, setFilter: (value: string) => void } }) => {
  const intl = useIntl();
  const { inputValue, handleChange } = useDebouncedFilter({
    filterValue,
    setFilter,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  return (
    <FormControl
      placeholder={intl.formatMessage(messages.emailOrUsername)}
      trailingElement={<Icon src={Search} />}
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export default UsernameFilter;
