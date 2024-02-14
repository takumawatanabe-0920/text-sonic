import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { ROUTER_PATH } from '~/constants/router-path';
import { breakPointLessThan } from '~/styles/utils';

const HeaderHamburgerMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HeaderHamburgerMenuWrapper>
      <Toolbar
        sx={{
          paddingRight: 0,
          paddingLeft: 0,
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
        >
          <MenuIcon />
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
          <MenuItem onClick={handleClose}>
            <RuleLink href={ROUTER_PATH.SUPPORT}>Support</RuleLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <RuleLink href={ROUTER_PATH.ABOUT}>About us</RuleLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <RuleLink href={ROUTER_PATH.CONTACT}>Contact us</RuleLink>
          </MenuItem>
        </Menu>
      </Toolbar>
    </HeaderHamburgerMenuWrapper>
  );
};

const HeaderHamburgerMenuWrapper = styled.div`
  display: none;

  ${breakPointLessThan.SP(css`
    display: block;
  `)}
`;

const RuleLink = styled.a`
  font-size: 14px;
  color: #000000;
  text-decoration: none;
`;

export default HeaderHamburgerMenu;
