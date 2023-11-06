import Modal from '@mui/material/Modal';
import Image from 'next/image';
import styled from 'styled-components';
import { color } from '~/styles/utils';

const ModalContainer = styled.div`
  background-color: ${color.WHITE};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px 54px;
  border-radius: 12px;
`;

const CloseIcon = () => {
  return (
    <Image
      src='/images/icons/close.svg'
      alt='メールの送信が完了しました'
      width={24}
      height={24}
    />
  )
}

export { CloseIcon, Modal, ModalContainer };

