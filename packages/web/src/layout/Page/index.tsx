import React from "react";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import PageWrapper from "./PageWrapper";
import NavigationBar from "./NavigationBar";
import { TOKEN_COOKIE } from "constants/auth";
import AppMenu from "./AppMenu";

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
  const [cookies, , removeCookie] = useCookies([TOKEN_COOKIE]);
  const navigate = useNavigate();

  return (
    <StyledPage>
      <NavigationBar
        loggedIn={!!cookies[TOKEN_COOKIE]}
        onLogout={(e: React.MouseEvent<HTMLButtonElement>) => {
          removeCookie(TOKEN_COOKIE);
          navigate("/login");
        }}
      />
      <Box display="flex" height="100%">
        {!hideAppMenu && <AppMenu />}

        <PageWrapper hideAppMenu={hideAppMenu}>{children}</PageWrapper>
      </Box>
    </StyledPage>
  );
};

export default Page;
