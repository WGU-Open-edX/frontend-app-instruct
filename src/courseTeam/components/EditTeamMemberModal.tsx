import { useParams } from 'react-router-dom';
import { ActionRow, Button, FormControl, FormLabel, ModalDialog } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';
import messages from '../messages';
import { CourseTeamMember } from '../types';
import { useRoles } from '../data/apiHook';
import { FormCheckboxSet, FormCheckbox } from '@openedx/paragon/dist/Form';

interface EditTeamMemberModalProps {
  isOpen: boolean,
  user: CourseTeamMember,
  onClose: () => void,
}

const EditTeamMemberModal = ({ isOpen, user, onClose }: EditTeamMemberModalProps) => {
  const intl = useIntl();
  const { courseId = '' } = useParams<{ courseId: string }>();

  const { data = [] } = useRoles(courseId);

  const filteredRoles = data?.filter(role => !user.roles.includes(role.name)) || [];

  const roles = [{ id: '', name: intl.formatMessage(messages.rolePlaceholder) }, ...filteredRoles];

  return (
    <ModalDialog
      isOpen={isOpen}
      title={intl.formatMessage(messages.editTeamTitle, { username: user.username })}
      onClose={onClose}
      isOverflowVisible={false}
    >
      <ModalDialog.Header className="bg-primary-500">
        <h3 className="text-white">{intl.formatMessage(messages.editTeamTitle, { username: user.username })}</h3>
      </ModalDialog.Header>
      <ModalDialog.Body className="p-4">
        <p>{intl.formatMessage(messages.editInstructions, { username: user.username })}</p>
        {
          user.roles.map((role) => (
            <FormCheckboxSet key={role} className="mt-2" name={`role-${role}`}>
              <FormCheckbox>{role}</FormCheckbox>
            </FormCheckboxSet>
          ))
        }
        <FormLabel className="mt-4">{intl.formatMessage(messages.addRole)}</FormLabel>
        <FormControl as="select" placeholder={intl.formatMessage(messages.rolePlaceholder)} disabled={roles.length === 1}>
          {
            roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))
          }
        </FormControl>
      </ModalDialog.Body>
      <ModalDialog.Footer className="p-4">
        <ActionRow>
          <Button variant="tertiary" onClick={onClose}>{intl.formatMessage(messages.cancelButton)}</Button>
          <Button variant="primary" onClick={onClose}>{intl.formatMessage(messages.saveButton)}</Button>
        </ActionRow>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

export default EditTeamMemberModal;
