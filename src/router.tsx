import {createBrowserRouter} from "react-router";
import RootLayout from "./layout/RootLayout.tsx";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home }
    ]
  },
]);

export default router