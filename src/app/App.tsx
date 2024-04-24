import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "./Palette.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeModeProvider } from "./providers/ThemeModeProvider";
import routes from "./routes";
import "./Global.css";
import { MantineProvider } from "@mantine/core";

function App() {
  const router = createBrowserRouter(routes);
  return (
    <MantineProvider>
      <ThemeModeProvider>
        <RouterProvider router={router} />
      </ThemeModeProvider>
    </MantineProvider>
  );
}

export default App;
