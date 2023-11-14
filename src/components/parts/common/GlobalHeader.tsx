import { AccountCircle } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import LoginManager from '~/components/login/LoginManager';
import toastMessage from '~/components/parts/toast/ToastMessage';
import { useUser } from '~/hooks/api/user';
import { getCurrentUser, logout } from '~/lib/api/user';
import { breakPointLessThan } from '~/styles/utils';

const GlobalHeader = (): JSX.Element => {
  const [isRequiredAuth, setIsRequiredAuth] = useState(false);
  const { user, mutateUser } = useUser({
    isRequiredAuth,
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      toastMessage({
        type: 'success',
        message: 'success to logout.',
      });
      logout();
      await getCurrentUser();
      mutateUser(null);
      handleClose();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toastMessage({
          type: 'error',
          message: error.message || 'failed to logout.',
        });
      }
    }
  };

  const handleLoginOpen = () => {
    setIsRequiredAuth(true);
  };

  const afterLoginAction = () => {
    setIsRequiredAuth(false);
    handleClose();
  };

  const afterSignUpAction = () => {
    handleClose();
  };

  return (
    <StyledHeader>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography
              variant="h5"
              component="a"
              sx={{ flexGrow: 1 }}
              href={'/'}
            >
              <Title>Speechify Scripts</Title>
            </Typography>
            {user ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogout}>
                    Logout {`(${user.email})`}
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button color="inherit" onClick={handleLoginOpen}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <LoginManager
          afterLoginAction={afterLoginAction}
          afterSignUpAction={afterSignUpAction}
          isRequiredAuth={isRequiredAuth}
        />
      </Box>
    </StyledHeader>
  );
};

const StyledHeader = styled.header``;

const Title = styled.p`
  font-weight: bold;
  font-size: 20px;

  ${breakPointLessThan.SP(css`
    font-size: 18px;
  `)}
`;

export default GlobalHeader;
