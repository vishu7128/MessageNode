import "./App.css";
import HomePage from "./components/HomePage";
import RootLayout from "./components/RootLayout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SinglePost from "./components/SinglePost";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        {
          path: "posts/:postId",
          element: <SinglePost />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
