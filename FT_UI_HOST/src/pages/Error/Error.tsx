import React from "react";
import { Button } from "@pluralsight/react";
import { useNavigate } from "react-router-dom";

export const ErrorPage = ({ error }: any) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Something went wrong!</h1>
      <pre>{error.message}</pre>
      <Button size="m" sentiment="danger" onClick={() => navigate("/home")}>
        Go Home
      </Button>
    </div>
  );
};
