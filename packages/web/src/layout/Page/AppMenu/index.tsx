import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { LAYOUT_SIZES } from "theme";
import AppMenuSummary from "./AppMenuSummary";
import AppMenuItem from "./AppMenuItem";

const AppMenuContainer = styled(Box)`
  overflow-y: auto;
  height: calc(100% - ${LAYOUT_SIZES.navigationBar.height});
  background-color: white;
  min-width: ${LAYOUT_SIZES.appSideMenu.width};
  max-width: ${LAYOUT_SIZES.appSideMenu.height};
  top: ${LAYOUT_SIZES.navigationBar.height};
  position: fixed;
`;

const AppMenu = () => {
  return (
    <AppMenuContainer sx={{ boxShadow: 3 }}>
      <AppMenuSummary />
      <AppMenuItem selected title="Item 1" subtext="Some value goes here" />
      <AppMenuItem title="Item 2" subtext="Some value goes here" />
    </AppMenuContainer>
  );
};

export default AppMenu;
