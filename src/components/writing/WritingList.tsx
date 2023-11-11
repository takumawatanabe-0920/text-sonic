import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import LoginManager from '~/components/login/LoginManager';
import toastMessage from '~/components/parts/toast/ToastMessage';
import CreateWritingDialog from '~/components/writing/CreateWritingDialog';
import UpdateWritingDialog from '~/components/writing/UpdateWritingDialog';
import { useUser } from '~/hooks/api/user';
import { Writing, deleteWriting } from '~/lib/api/writing';

type WritingListProps = {
  writings: Writing[];
};

const WritingList: React.FC<WritingListProps> = (props) => {
  const { writings } = props;
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [isRequiredAuth, setIsRequiredAuth] = useState(false);
  const [initialValue, setInitialValue] = useState<Writing>();
  const { user } = useUser({ isRequiredAuth });

  const handleCreateOpen = () => {
    setIsRequiredAuth(true);
    setInitialValue(undefined);
    if (!user) {
      return;
    }
    setOpen(true);
  };

  const handleUpdateOpen = (writing: Writing) => {
    setIsRequiredAuth(true);
    if (!user) {
      return;
    }
    setInitialValue(writing);
    setOpenUpdate(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  const afterLoginAction = () => {
    setIsRequiredAuth(false);
    setOpen(true);
  };

  const afterSignUpAction = () => {
    setOpen(true);
  };

  const handleDeleteWriting = async (writingId: string) => {
    try {
      await deleteWriting({ id: writingId });
      toastMessage({
        type: 'error',
        message: 'success to delete writing.',
      });
    } catch (e) {
      console.error(e);
      toastMessage({
        type: 'error',
        message: 'failed to delete writing.',
      });
    }
  };

  console.log({ initialValue });

  return (
    <>
      <WritingListWrapper container spacing={3}>
        <CustomList>
          <HR />
          {writings.map((writing, index) => (
            <React.Fragment key={index}>
              <CustomListItem disablePadding>
                <ListItemText primary={writing.title} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteWriting(writing.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="update"
                    onClick={() => handleUpdateOpen(writing)}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </CustomListItem>
              <HR />
            </React.Fragment>
          ))}
        </CustomList>
      </WritingListWrapper>
      <WritingButton variant="contained" onClick={handleCreateOpen}>
        Create New
      </WritingButton>
      <LoginManager
        afterLoginAction={afterLoginAction}
        afterSignUpAction={afterSignUpAction}
        isRequiredAuth={isRequiredAuth}
      />
      <CreateWritingDialog open={open} handleClose={handleClose} />
      {initialValue && (
        <UpdateWritingDialog
          open={openUpdate}
          handleClose={handleUpdateClose}
          writing={initialValue}
        />
      )}
    </>
  );
};

const WritingListWrapper = styled(Grid)`
  margin-top: 20px;
  width: 100%;
`;

const WritingButton = styled(Button)`
  margin: 10px 0;
  color: white;
  background-color: #3f51b5;

  &:hover {
    background-color: #4660d9;
  }
`;

const CustomList = styled(List)`
  padding-left: 30px;
  width: 100%;
`;

const CustomListItem = styled(ListItem)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const HR = styled(Divider)`
  margin: 10px 0;
`;

export default WritingList;
