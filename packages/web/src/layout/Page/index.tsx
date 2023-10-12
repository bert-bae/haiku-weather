import React from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import PageWrapper from "./PageWrapper";
import NavigationBar from "./NavigationBar";

type PageProps = React.FC<{
  children: any;
}>;

const StyledPage = styled(Box)`
  height: 100%;
  width: 100%;
  position: relative;
  background-color: black;
`;

const Page: PageProps = ({ children }) => {
  return (
    <StyledPage>
      <NavigationBar />
      <Box display="flex" height="100%">
        <PageWrapper>{children}</PageWrapper>
      </Box>
    </StyledPage>
  );
};

export default Page;
