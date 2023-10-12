import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { useGetWeatherReport } from "api/__generated__/server";
import Page from "layout/Page";
import { useEffect, useState } from "react";
import PageSkeleton from "./PageSkeleton";
import PageContent from "./PageContent";

const MainPage = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number }>(null);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data, refetch, isLoading } = useGetWeatherReport(
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
      {isLoading && <PageSkeleton mobile={mobile} />}
      {!isLoading && data && <PageContent mobile={mobile} {...data.data} />}
    </Page>
  );
};

export default MainPage;
