import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddAllowanceParams, Allowance } from '../types';
import { useAddAllowance } from '../data/apiHook';
import AddAllowanceModal from './AddAllowanceModal';
import AllowancesList from './AllowancesList';
import EditAllowanceModal from './EditAllowanceModal';
import { Menu, MenuItem, ModalPopup, useToggle } from '@openedx/paragon';

const Allowances = () => {
  const { courseId = '' } = useParams<{ courseId: string }>();
  const { mutate: addAllowance } = useAddAllowance(courseId);
  const [isAddModalOpen, openAddModal, closeAddModal] = useToggle(false);
  const [isEditModalOpen, openEditModal, closeEditModal] = useToggle(false);
  const [selectedAllowance, setSelectedAllowance] = useState<Allowance | null>(null);
  const [menuTarget, setMenuTarget] = useState<HTMLElement | null>(null);

  const confirmAddAllowance = (newAllowance: AddAllowanceParams) => {
    addAllowance({ newAllowance }, {
      onSuccess: () => {
        closeAddModal();
      }
    });
  };

  const handleEdit = () => {
    openEditModal();
    setMenuTarget(null);
  };

  const handleCloseEditModal = () => {
    setSelectedAllowance(null);
    closeEditModal();
  };

  const handleDelete = () => {
    setMenuTarget(null);
  };

  const handleClickMore = (allowance: Allowance, btnRef: HTMLButtonElement) => {
    setSelectedAllowance(allowance);
    setMenuTarget(btnRef);
  };

  return (
    <>
      <AllowancesList onClickAdd={openAddModal} onClickMore={handleClickMore} />
      <AddAllowanceModal isOpen={isAddModalOpen} onClose={closeAddModal} onAdd={confirmAddAllowance} />
      {selectedAllowance && <EditAllowanceModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} allowance={selectedAllowance} />}
      {menuTarget && (
        <ModalPopup target={menuTarget} isOpen={!!menuTarget} onClose={() => setMenuTarget(null)}>
          <Menu>
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </ModalPopup>
      )}
    </>
  );
};

export default Allowances;
