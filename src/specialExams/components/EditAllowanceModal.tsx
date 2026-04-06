import { useParams } from 'react-router-dom';
import { useIntl } from '@openedx/frontend-base';
import { ActionRow, Button, Form, ModalDialog } from '@openedx/paragon';
import { Allowance } from '../types';
import { useEditAllowance } from '../data/apiHook';
import messages from '../messages';

interface EditAllowanceModalProps {
  isOpen: boolean,
  onClose: () => void,
  allowance: Allowance,
}

const EditAllowanceModal = ({ isOpen, onClose, allowance }: EditAllowanceModalProps) => {
  const intl = useIntl();
  const { courseId = '' } = useParams<{ courseId: string }>();
  const { mutate: editAllowance } = useEditAllowance(courseId);

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editAllowance({ allowanceId: 0, updatedAllowance: {
      examType: allowance.examType,
      allowanceType: allowance.allowanceType,
      allowanceValue: allowance.allowanceValue
    } }, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <ModalDialog isOpen={isOpen} onClose={onClose} title={intl.formatMessage(messages.editAllowance)} isOverflowVisible={false} size="lg">
      <ModalDialog.Header className="border-bottom border-light-700">
        <ModalDialog.Title className="text-primary-700">{intl.formatMessage(messages.editAllowance)}</ModalDialog.Title>
      </ModalDialog.Header>
      <Form className="position-relative overflow-auto" onSubmit={handleEdit}>
        <ModalDialog.Body>
          <Form.Group controlId="select-exam-type">
            <Form.Label>{intl.formatMessage(messages.selectExamType)}:</Form.Label>
            <Form.Control as="select">
              <option value="">{intl.formatMessage(messages.selectExamType)}</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="select-exams">
            <Form.Label>{intl.formatMessage(messages.selectExams)}:</Form.Label>
          </Form.Group>
          <Form.Group controlId="select-allowance-type">
            <Form.Label>{intl.formatMessage(messages.selectAllowanceType)}:</Form.Label>
            <Form.Control as="select">
              <option value="">{intl.formatMessage(messages.allowanceType)}</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="allowance-value">
            <Form.Label>{intl.formatMessage(messages.addTime)}:</Form.Label>
            <Form.Control type="text" placeholder={intl.formatMessage(messages.addTimePlaceholder)} />
          </Form.Group>
        </ModalDialog.Body>
        <ModalDialog.Footer className="border-top border-light-700">
          <ActionRow>
            <Button variant="tertiary" onClick={onClose}>{intl.formatMessage(messages.cancel)}</Button>
            <Button variant="primary" type="submit">{intl.formatMessage(messages.editAllowance)}</Button>
          </ActionRow>
        </ModalDialog.Footer>
      </Form>
    </ModalDialog>
  );
};

export default EditAllowanceModal;
