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
import WritingDialog from '~/components/writing/WritingDialog';
import { useUser } from '~/hooks/api/user';

type WritingListProps = {
  writings: {
    title: string;
    content: string;
  }[];
};

const WritingList: React.FC<WritingListProps> = (props) => {
  const { writings } = props;
  const [open, setOpen] = useState(false);
  const [isRequiredAuth, setIsRequiredAuth] = useState(false);
  const { user } = useUser({ isRequiredAuth });

  const handleOpen = () => {
    setIsRequiredAuth(true);
    if (!user) {
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const afterLoginAction = () => {
    setIsRequiredAuth(false);
    setOpen(true);
  };

  const afterSignUpAction = () => {
    setOpen(true);
  };

  return (
    <>
      <WritingListWrapper container spacing={3}>
        <CustomList>
          <HR />
          {writings.map((item, index) => (
            <React.Fragment key={index}>
              <CustomListItem disablePadding>
                <ListItemText primary={item.title} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    // onClick={() => deleteItem(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {/* update */}
                  <IconButton
                    edge="end"
                    aria-label="update"
                    onClick={handleOpen}
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
      <WritingButton variant="contained" onClick={handleOpen}>
        Create New
      </WritingButton>
      <LoginManager
        afterLoginAction={afterLoginAction}
        afterSignUpAction={afterSignUpAction}
        isRequiredAuth={isRequiredAuth}
      />
      <WritingDialog
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
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
