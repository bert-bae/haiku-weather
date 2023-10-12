import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import { theme } from "theme";
const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>Hello world</div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
