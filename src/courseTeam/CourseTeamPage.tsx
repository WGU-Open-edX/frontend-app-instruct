import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIntl } from '@openedx/frontend-base';
import { Button, Tab, Tabs, useToggle } from '@openedx/paragon';
import messages from './messages';
import MembersContent from './components/MembersContent';
import RolesContent from './components/RolesContent';
import AddTeamMemberModal from './components/AddTeamMemberModal';
import EditTeamMemberModal from './components/EditTeamMemberModal';
import { useAddTeamMember } from './data/apiHook';
import { CourseTeamMember } from './types';

const CourseTeamPage = () => {
  const intl = useIntl();
  const { courseId = '' } = useParams<{ courseId: string }>();
  const [isOpenAddModal, openAddModal, closeAddModal] = useToggle(false);
  const [isOpenEditModal, openEditModal, closeEditModal] = useToggle(false);
  const [selectedUser, setSelectedUser] = useState<CourseTeamMember | null>(null);
  const { mutate: addTeamMember } = useAddTeamMember(courseId);

  const handleAdd = ({ users, role }: { users: string[], role: string }) => {
    addTeamMember({ users, role });
    closeAddModal();
  };

  const handleEdit = (user: CourseTeamMember) => {
    setSelectedUser(user);
    openEditModal();
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary-700 mb-0">{intl.formatMessage(messages.courseTeamTitle)}</h3>
        <Button variant="primary" onClick={openAddModal}>+ {intl.formatMessage(messages.addTeamMember)}</Button>
      </div>
      <Tabs>
        <Tab eventKey="members" title={intl.formatMessage(messages.membersTab)}>
          <MembersContent onEdit={handleEdit} />
        </Tab>
        <Tab eventKey="roles" title={intl.formatMessage(messages.rolesTab)}>
          <RolesContent />
        </Tab>
      </Tabs>
      {isOpenAddModal && <AddTeamMemberModal isOpen={isOpenAddModal} onClose={closeAddModal} onSave={handleAdd} />}
      {isOpenEditModal && selectedUser && <EditTeamMemberModal isOpen={isOpenEditModal} user={selectedUser} onClose={closeEditModal} />}
    </>
  );
};

export default CourseTeamPage;
