import React from "react";
import { Outlet } from "react-router-dom";
import Index from "../pages/Index";
import Content from "../pages/ContentConfig";
import Style from "../pages/StyleConfig";
import Header from "../components/Header";

function Page() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

const routes = [
  {
    element: <Page />,
    children: [
      {
        index: true,
        element: <Index />,
        children: [],
      },
      {
        path: "config",
        children: [
          {
            path: "content",
            element: <Content />,
          },
          {
            path: "style",
            element: <Style />,
          },
        ],
      },
    ],
  },
];

export default routes;
