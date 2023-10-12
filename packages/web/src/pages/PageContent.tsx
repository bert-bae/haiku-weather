import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import PageLayout from "./PageLayout";
import styled from "@emotion/styled";

interface IPageContentProps {
  imageUrl: string;
  poem: string;
  mobile: boolean;
}

const PageContent = ({ poem, imageUrl, mobile }: IPageContentProps) => {
  const theme = useTheme();
  return (
    <PageLayout mobile={mobile}>
      <StyledImg
        src={imageUrl}
        alt="Generated image"
        style={{ marginBottom: mobile ? theme.spacing(6) : 0 }}
      />
      <Typography
        variant="h3"
        sx={{ whiteSpace: "pre-wrap", textAlign: "center" }}
      >
        {poem}
      </Typography>
    </PageLayout>
  );
};

const StyledImg = styled.img`
  max-height: ${({ theme }) => theme.spacing(60)};
  max-width: ${({ theme }) => theme.spacing(60)};
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows[4]};
  border-radius: 12px;
`;

export default PageContent;
