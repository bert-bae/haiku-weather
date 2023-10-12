import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { useGetWeatherReport } from "api/__generated__/server";
import Page from "layout/Page";
import { useEffect, useState } from "react";

const StyledImg = styled.img`
  height: ${({ theme }) => theme.spacing(60)};
  max-width: ${({ theme }) => theme.spacing(60)};
  box-shadow: ${({ theme }) => theme.shadows[4]};
  border-radius: 12px;
`;

const MainPage = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number }>(null);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data, refetch, isLoading } = useGetWeatherReport(
    {
      lat: location?.lat ? String(location.lat) : "",
      lon: location?.lon ? String(location.lon) : "",
    },
    { query: { cacheTime: 120000, enabled: false, queryKey: [location] } }
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (location) {
      refetch();
    }
  }, [location]);

  return (
    <Page>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        flexDirection={mobile ? "column" : "row"}
        sx={{ mt: 12, mb: 12 }}
      >
        {isLoading && (
          <>
            <Skeleton
              variant="rectangular"
              sx={{
                height: theme.spacing(60),
                width: theme.spacing(60),
                borderRadius: "12px",
                mb: mobile ? 6 : 0,
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
            <StyledImg
              src={data?.data.imageUrl}
              alt="Generated image"
              style={{ marginBottom: mobile ? theme.spacing(6) : 0 }}
            />
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
