import { ToastSentiment } from "@pluralsight/headless-styles/npm/types/src/components/Toast/types";
import {
  Button,
  ErrorMessage,
  Flex,
  FlexItem,
  FormControlProvider,
  Input,
  Label,
  TextLink,
  Toast,
} from "@pluralsight/react";
import useFetch from "container/hooks/useFetch";
import { BASEURL, MfeBasePrefix } from "container/shared/constants";
import React, { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ToastSentiment>("warning");

  const itemStyles = {
    paddingTop: "30px",
  };

  const [body, setBody] = useState({
    username: "",
    password: "",
  });

  const {
    data,
    error,
    loading,
    fetchData: createUser,
  } = useFetch("POST", `${BASEURL}auth/signup`, body);

  useEffect(() => {
    if (data) {
      setToastType("success");
      setToastMessage("User Created Successfully!");
      const timer = setTimeout(() => {
        handleToastClose();
        navigate(`/${MfeBasePrefix.auth}/login`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [data, navigate]);

  const [formState, setFormState] = useState({
    username: {
      disabled: false,
      invalid: false,
      required: true,
      value: "",
    },
    password: {
      disabled: false,
      invalid: false,
      required: true,
      value: "",
    },
  });

  const disableSubmit: boolean = useMemo(() => {
    const isInvalid = Object.values(formState).some(
      (control) => control.required && !control.value
    );
    return isInvalid;
  }, [formState]);

  const controlChange = (controlName: string, value: string) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        [controlName]: {
          ...prevState.username,
          invalid: !value ? true : false,
          value,
        },
      };
    });
    setBody((prevValues) => ({ ...prevValues, [controlName]: value }));
  };

  const submitCreate = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    createUser();
  };

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ): void => {
    event.preventDefault();
    navigate(`/${MfeBasePrefix.auth}/login`);
  };

  useEffect(() => {
    if (error) {
      setToastType("danger");
      setToastMessage(error);
      const timer = setTimeout(() => {
        handleToastClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleToastClose = () => {
    setToastMessage("");
  };

  return (
    <>
      <div>
        {toastMessage && (
          <Toast sentiment={toastType} onClose={handleToastClose}>
            {toastMessage}
          </Toast>
        )}
      </div>
      <Flex align="center" justify="center" direction="column">
        <form>
          <Flex align="center" justify="center" direction="column">
            <h2>Sign Up</h2>
          </Flex>
          <FlexItem grow="1" style={itemStyles}>
            <FormControlProvider {...formState.username}>
              <Label htmlFor="username">Username</Label>
              <Input
                describedBy="username:error"
                placeholder="Type Username"
                id="username"
                name="username"
                type="text"
                value={formState.username.value}
                onChange={(e) => controlChange("username", e.target.value)}
              />
              <ErrorMessage id="username:error">
                Username is Required
              </ErrorMessage>
            </FormControlProvider>
          </FlexItem>
          <FlexItem grow="1" style={itemStyles}>
            <FormControlProvider {...formState.password}>
              <Label htmlFor="password">Password</Label>
              <Input
                describedBy="password:error"
                placeholder="Type Password"
                id="password"
                name="password"
                type="password"
                value={formState.password.value}
                onChange={(e) => controlChange("password", e.target.value)}
              />
              <ErrorMessage id="password:error">
                Password is Required
              </ErrorMessage>
            </FormControlProvider>
          </FlexItem>
          <Flex
            align="center"
            justify="center"
            direction="column"
            style={itemStyles}
          >
            <Button
              type="submit"
              size="l"
              disabled={disableSubmit}
              onClick={(event) => submitCreate(event)}
            >
              Sign Up
            </Button>
            {loading && <p>Saving in progress...</p>}
          </Flex>
        </form>
        <Flex align="center" justify="center" direction="row">
          <TextLink onClick={(event) => handleLinkClick(event)}>Login</TextLink>
        </Flex>
      </Flex>
    </>
  );
};
