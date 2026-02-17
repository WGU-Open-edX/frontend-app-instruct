import { useState } from 'react';
import { Button, Form, Icon, OverlayTrigger, Tooltip } from '@openedx/paragon';
import { InfoOutline } from '@openedx/paragon/icons';
import { useIntl } from '@openedx/frontend-base';
import messages from './messages';

interface SpecifyProblemFieldProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  problemResponsesError?: string,
  disabled?: boolean,
  fieldLabel: string,
  buttonLabel: string,
}

const SpecifyProblemField = ({
  onClick,
  problemResponsesError,
  disabled,
  fieldLabel,
  buttonLabel,
}: SpecifyProblemFieldProps) => {
  const intl = useIntl();
  const [problemLocation, setProblemLocation] = useState('');

  return (
    <>
      <Form.Group className="m-0" isInvalid={!!problemResponsesError}>
        <Form.Label className="d-flex align-content-end align-items-center gap-2">
          {fieldLabel}
          <OverlayTrigger
            placement="top"
            overlay={(
              <Tooltip id="problem-location-tooltip">
                {intl.formatMessage(messages.problemLocationTooltip)}
              </Tooltip>
            )}
          >
            <Icon src={InfoOutline} size="sm" aria-label={intl.formatMessage(messages.problemLocationInfoIconLabel)} />
          </OverlayTrigger>
        </Form.Label>
        <div className="d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder={intl.formatMessage(messages.problemLocationPlaceholder)}
            value={problemLocation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProblemLocation(e.target.value)}
            className="flex-grow-1"
          />
          {problemResponsesError && (
            <Form.Control.Feedback type="invalid">
              {problemResponsesError}
            </Form.Control.Feedback>
          )}
          <Button
            variant="primary"
            onClick={onClick}
            disabled={disabled}
            className="text-nowrap"
          >
            {buttonLabel}
          </Button>
        </div>
      </Form.Group>
    </>
  );
};

export default SpecifyProblemField;
