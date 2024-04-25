import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./Palette.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeModeProvider } from "./providers/ThemeModeProvider";
import routes from "./routes";
import "./Global.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';

function App() {
  const router = createBrowserRouter(routes);
  return (
    <MantineProvider>
      <ThemeModeProvider>
        <Notifications />
        <RouterProvider router={router} />
      </ThemeModeProvider>
    </MantineProvider>
  );
}

export default App;
