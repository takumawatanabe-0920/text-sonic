import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import styled from 'styled-components';

type WritingListProps = {
  writings: {
    title: string;
    content: string;
  }[];
};

const WritingList: React.FC<WritingListProps> = (props) => {
  const { writings } = props;

  return (
    <>
      <WritingListWrapper container spacing={3}>
        <nav aria-label="secondary mailbox folders">
          <List>
            {writings.map((item, index) => (
              <ListItem key={index}>
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
                  <IconButton edge="end" aria-label="delete">
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </nav>
      </WritingListWrapper>
      <WritingButton variant="contained">Create New</WritingButton>
    </>
  );
};

const WritingListWrapper = styled(Grid)`
  margin-top: 20px;
`;

const WritingButton = styled(Button)`
  margin: 10px;
  color: white;
  background-color: #3f51b5;

  &:hover {
    background-color: #4660d9;
  }
`;

export default WritingList;
