import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import styled from "@emotion/styled";

type NavigationBarProps = {};

const StyledAppBar = styled(AppBar)`
  background-color: white;
  z-index: 1000;
`;

const NavigationBar: React.FC<NavigationBarProps> = () => {
  return (
    <StyledAppBar position="fixed">
      <Toolbar sx={{ width: "100%", margin: "0 auto" }}>
        <Box sx={{ flexGrow: 1 }}>Logo</Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavigationBar;
