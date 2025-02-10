import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/Home/Home";
import { MfeBasePrefix } from "../shared/constants";
import { Layout } from "../pages/Layout/Layout";
import { ErrorPage } from "../pages/Error/Error";

const AuthRoutes = lazy(() =>
  import("auth/AuthRoutes").catch((error) => ({
    default: () => <ErrorPage error={error} />,
  }))
);

const DashboardRoutes = lazy(() =>
  import("dashboard/DashboardRoutes").catch((error) => ({
    default: () => <ErrorPage error={error} />,
  }))
);

const TransactionsRoutes = lazy(() =>
  import("transactions/TransactionsRoutes").catch((error) => ({
    default: () => <ErrorPage error={error} />,
  }))
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: `/${MfeBasePrefix.auth}/*`,
        element: (
          <Suspense fallback="Loading Auth App...">
            <AuthRoutes />
          </Suspense>
        ),
      },
      {
        path: `/${MfeBasePrefix.dashboard}/*`,
        element: (
          <Suspense fallback="Loading Auth App...">
            <DashboardRoutes />
          </Suspense>
        ),
      },
      {
        path: `/${MfeBasePrefix.transactions}/*`,
        element: (
          <Suspense fallback="Loading Auth App...">
            <TransactionsRoutes />
          </Suspense>
        ),
      },
      {
        path: "home",
        element: <HomePage />,
      },
    ],
  },
]);

export default routes;
