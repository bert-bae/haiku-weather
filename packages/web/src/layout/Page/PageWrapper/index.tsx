import React from "react";
import { Box, Container } from "@mui/material";
import { styled } from "@mui/system";
import { LAYOUT_SIZES } from "theme";

type PageWrapperProps = React.FC<{ children: any }>;

const MainContainer = styled(Container)`
  height: fit-content;
  min-height: 100%;
  width: 100%;
  padding-top: ${LAYOUT_SIZES.navigationBar.height};
  box-sizing: border-box;
  margin-left: 0;
`;

const PageWrapper: PageWrapperProps = (props) => {
  return (
    <Box
      flex={1}
      sx={{
        height: "100%",
        paddingLeft: 0,
      }}
    >
      <MainContainer maxWidth={false}>{props.children}</MainContainer>
    </Box>
  );
};

export default PageWrapper;
