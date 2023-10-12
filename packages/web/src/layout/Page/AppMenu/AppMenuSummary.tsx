import { Box, Typography } from "@mui/material";
import ProfileImage from "components/ProfileImage";
import Profile from "components/Icons/Profile";
import styled from "@emotion/styled";

interface IAppMenuSummaryProps {
  userImage?: string;
}

const SummaryContainer = styled(Box)`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: ${({ theme }) => theme.zIndex.drawer};
`;

const AppMenuSummary = ({ userImage }: IAppMenuSummaryProps) => {
  return (
    <SummaryContainer
      display="flex"
      justifyContent="space-between"
      gap={2}
      sx={{
        padding: 2,
        boxShadow: 2,
      }}
    >
      {userImage ? (
        <ProfileImage src={userImage} alt="Profile image" />
      ) : (
        <Profile
          height="80"
          width="80"
          style={{
            borderRadius: "50%",
          }}
        />
      )}
      <Box>
        <Typography variant="h4" component="p">
          {new Date().toDateString()}
        </Typography>
      </Box>
    </SummaryContainer>
  );
};

export default AppMenuSummary;
