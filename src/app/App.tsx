import "./Palette.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeModeProvider } from "./providers/ThemeModeProvider";
import routes from "./routes";
import "./Global.css";

function App() {
  const router = createBrowserRouter(routes);
  return (
    <ThemeModeProvider>
      <RouterProvider router={router} />
    </ThemeModeProvider>
  );
}

export default App;
