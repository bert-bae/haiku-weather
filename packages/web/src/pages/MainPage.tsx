import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Skeleton, Typography } from "@mui/material";
import { useGetWeatherReport } from "api/__generated__/server";
import Page from "layout/Page";

const StyledImg = styled.img`
  height: ${({ theme }) => theme.spacing(60)};
  width: ${({ theme }) => theme.spacing(60)};
  box-shadow: ${({ theme }) => theme.shadows[4]};
  border-radius: 12px;
`;

const MainPage = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetWeatherReport(
    {
      lat: "49.282730",
      lon: "-123.120735",
    },
    { query: { cacheTime: 120000, queryKey: ["GetWeather"] } }
  );

  return (
    <Page>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        sx={{ pt: 12, pb: 12 }}
      >
        {isLoading && (
          <>
            <Skeleton
              variant="rectangular"
              sx={{
                height: theme.spacing(60),
                width: theme.spacing(60),
                borderRadius: "12px",
              }}
            />
            <Box display="flex" flexDirection="column" alignItems="center">
              <Skeleton height="32px" width="250px" />
              <Skeleton height="32px" width="300px" />
              <Skeleton height="32px" width="250px" />
            </Box>
          </>
        )}
        {!isLoading && (
          <>
            <StyledImg src={data?.data.imageUrl} alt="Generated image" />
            <Typography
              variant="h3"
              sx={{ whiteSpace: "pre-wrap", textAlign: "center" }}
            >
              {data?.data.poem}
            </Typography>
          </>
        )}
      </Box>
    </Page>
  );
};

export default MainPage;
