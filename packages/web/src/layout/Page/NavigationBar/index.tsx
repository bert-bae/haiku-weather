import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import Logo from "components/Icons/Logo";

type NavigationBarProps = {
  loggedIn: boolean;
  onMenuClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const StyledAppBar = styled(AppBar)`
  background-color: white;
  z-index: 1000;
`;

const NavigationBar: React.FC<NavigationBarProps> = ({
  loggedIn,
  onMenuClick,
  onLogout,
}) => {
  const navigate = useNavigate();

  return (
    <StyledAppBar position="fixed">
      <Toolbar sx={{ width: "100%", margin: "0 auto" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Logo />
        </Box>
        {!loggedIn ? (
          <>
            <Button
              sx={{ marginRight: "8px" }}
              variant="outlined"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button variant="contained" onClick={() => navigate("/register")}>
              Register
            </Button>
          </>
        ) : (
          <>
            <Avatar sx={{ bgcolor: "#FF4500", m: 1 }}>
              {"username".charAt(0).toUpperCase()}
            </Avatar>
            <Button
              sx={{ marginLeft: 1 }}
              variant="outlined"
              onClick={(e) => onLogout(e)}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavigationBar;
