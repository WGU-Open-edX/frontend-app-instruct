import { useIntl } from '@openedx/frontend-base';
import { ActionRow, Button, Form, ModalDialog } from '@openedx/paragon';
import { AddAllowanceParams } from '../types';
import messages from '../messages';

interface AddAllowanceModalProps {
  isOpen: boolean,
  onClose: () => void,
  onAdd: (allowanceData: AddAllowanceParams) => void,
}

const AddAllowanceModal = ({ isOpen, onClose, onAdd }: AddAllowanceModalProps) => {
  const intl = useIntl();

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({
      emailOrUsername: '',
      examType: '',
      exams: [],
      allowanceType: '',
      allowanceValue: ''
    });
  };

  return (
    <ModalDialog isOpen={isOpen} onClose={onClose} title={intl.formatMessage(messages.addAllowance)} isOverflowVisible={false} size="lg">
      <ModalDialog.Header className="border-bottom border-light-700">
        <ModalDialog.Title className="text-primary-700">{intl.formatMessage(messages.addAllowance)}</ModalDialog.Title>
      </ModalDialog.Header>
      <Form className="position-relative overflow-auto" onSubmit={handleAdd}>
        <ModalDialog.Body>
          <Form.Group controlId="specify-learners">
            <Form.Label>{intl.formatMessage(messages.specifyLearners)}:</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder={intl.formatMessage(messages.specifyLearnersPlaceholder)} />
          </Form.Group>
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
            <Button variant="primary" type="submit">{intl.formatMessage(messages.createAllowance)}</Button>
          </ActionRow>
        </ModalDialog.Footer>
      </Form>
    </ModalDialog>
  );
};

export default AddAllowanceModal;
