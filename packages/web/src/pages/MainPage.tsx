import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useGetWeatherReport } from "api/__generated__/server";
import Page from "layout/Page";
import { useEffect, useState } from "react";
import PageSkeleton from "./PageSkeleton";
import PageContent from "./PageContent";

function getLocationErrors(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "User denied the request for Geolocation.";

    case error.POSITION_UNAVAILABLE:
      return "Location information is unavailable.";

    case error.TIMEOUT:
      return "The request to get user location timed out.";

    case error.UNKNOWN_ERROR:
      return "An unknown error occurred.";
  }
}

const MainPage = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number }>(null);
  const [locationError, setLocationError] = useState<string>("");
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data, refetch, isFetching } = useGetWeatherReport(
    {
      lat: location?.lat ? String(location.lat) : "",
      lon: location?.lon ? String(location.lon) : "",
    },
    {
      query: {
        cacheTime: 120000,
        enabled: false,
        queryKey: [location],
        refetchOnWindowFocus: false,
      },
    }
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setLocationError("");
      },
      (e) => {
        const errMessage = getLocationErrors(e);
        setLocationError(errMessage);
      }
    );
  }, []);

  useEffect(() => {
    if (location) {
      refetch();
    }
  }, [location]);

  return (
    <Page>
      {(isFetching || !location) && <PageSkeleton mobile={mobile} />}
      {!isFetching && data && <PageContent mobile={mobile} {...data.data} />}
      {locationError && (
        <Box
          display="flex"
          flexDirection="column"
          height="calc(100vh - 64px)"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2">
            Location could not be determined.
          </Typography>
          <Typography variant="h3">{locationError}</Typography>
        </Box>
      )}
    </Page>
  );
};

export default MainPage;
