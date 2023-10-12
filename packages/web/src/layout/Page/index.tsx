import React from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import PageWrapper from "./PageWrapper";
import NavigationBar from "./NavigationBar";

type PageProps = React.FC<{
  children: any;
  pageTitle?: string;
  hideAppMenu: boolean;
}>;

const StyledPage = styled(Box)`
  height: 100%;
  width: 100%;
  position: relative;
`;

const Page: PageProps = ({ hideAppMenu, children }) => {
  return (
    <StyledPage>
      <NavigationBar />
      <Box display="flex" height="100%">
        <PageWrapper hideAppMenu={hideAppMenu}>{children}</PageWrapper>
      </Box>
    </StyledPage>
  );
};

export default Page;
