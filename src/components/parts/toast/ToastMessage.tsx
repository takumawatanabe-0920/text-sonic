import { ErrorIcon, SuccessIcon } from '../common/Icon';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { color } from '~/styles/utils';

export const displayIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <SuccessIcon size={20} />;
    case 'error':
      return <ErrorIcon size={20} />;
    default:
      return null;
  }
};

const ToastMessage = ({
  type,
  message,
}: {
  type: 'success' | 'error';
  message: string;
}) =>
  toast[type](
    <Container>
      {displayIcon(type)}
      <TextMessage>{message}</TextMessage>
    </Container>,
    {
      style: {
        marginLeft: '11px',
        marginBottom: '77px',
        width: '252px',
        minHeight: '38px',
        padding: 0,
        background:
          type == 'error'
            ? color.bg.NOTIFICATION_FAILED
            : color.bg.NOTIFICATION_SUCCESS,
        color: color.font.WHITE,
      },
    },
  );

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

ToastMessage.dismiss = toast.dismiss;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;
const TextMessage = styled.div`
  padding-left: 10px;
`;

export default ToastMessage;
