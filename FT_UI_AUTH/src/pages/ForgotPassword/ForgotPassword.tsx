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
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

type UserInfoResponse = {
  id: string;
  username: string;
};

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ToastSentiment>("warning");
  const itemStyles = {
    paddingTop: "30px",
  };
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
  const [isInvalid, setIsInvalid] = useState(true);
  const [body, setBody] = useState({
    id: "",
    username: "",
    password: "",
  });

  const {
    data: dataUser,
    error: errorUser,
    loading: loadingUser,
    fetchData: validateUser,
  } = useFetch<UserInfoResponse>(
    "GET",
    `${BASEURL}auth?username=${body.username}`
  );

  const {
    data: dataPassword,
    error: errorPassword,
    loading: loadingPassword,
    fetchData: updatePassword,
  } = useFetch<UserInfoResponse>(
    "PATCH",
    `${BASEURL}auth/${body.id}/password`,
    { password: body.password }
  );

  useEffect(() => {
    if (dataPassword) {
      setToastType("success");
      setToastMessage("Reset password successfully.");
      const timer = setTimeout(() => {
        handleToastClose();
        navigate(`/${MfeBasePrefix.auth}/login`);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dataPassword]);

  useEffect(() => {
    if (dataUser) {
      setBody((prevValues) => ({ ...prevValues, id: dataUser.id }));
    }
  }, [dataUser]);

  useEffect(() => {
    if (!body.id) {
      const control = formState.username;
      setIsInvalid(control.required && !control.value);
    } else {
      const control = formState.password;
      setIsInvalid(control.required && !control.value);
    }
  }, [body]);

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

  const submitLogin = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    step: string
  ): void => {
    event.preventDefault();
    if (step === "validate") {
      validateUser();
    } else {
      updatePassword();
    }
  };

  function handleLinkClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ): void {
    event.preventDefault();
    navigate(`/${MfeBasePrefix.auth}/${path}`);
  }

  useEffect(() => {
    if (errorUser || errorPassword) {
      const error = errorUser ? errorUser : errorPassword;
      setToastType("danger");
      setToastMessage(error || "");
      const timer = setTimeout(() => {
        handleToastClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorUser, errorPassword]);

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
            <h2>Recover Password</h2>
          </Flex>
          {!body.id && (
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
          )}

          {body.id && (
            <FlexItem grow="1" style={itemStyles}>
              <FormControlProvider {...formState.password}>
                <Label htmlFor="password">password</Label>
                <Input
                  describedBy="password:error"
                  placeholder="Type password"
                  id="password"
                  name="password"
                  type="password"
                  value={formState.password.value}
                  onChange={(e) => controlChange("password", e.target.value)}
                />
                <ErrorMessage id="password:error">
                  password is Required
                </ErrorMessage>
              </FormControlProvider>
            </FlexItem>
          )}

          <Flex
            align="center"
            justify="center"
            direction="column"
            style={itemStyles}
          >
            <Button
              type="submit"
              size="l"
              disabled={isInvalid}
              onClick={(event) =>
                submitLogin(event, !body.id ? "validate" : "update")
              }
            >
              {!body.id ? "Continue" : "Update Password"}
            </Button>
            {(loadingUser || loadingPassword) && <p>work in progress...</p>}
          </Flex>
        </form>
        <Flex align="center" justify="center" direction="row">
          <TextLink onClick={(event) => handleLinkClick(event, "sign-up")}>
            Sign Up
          </TextLink>
          <TextLink onClick={(event) => handleLinkClick(event, "login")}>
            Login
          </TextLink>
        </Flex>
      </Flex>
    </>
  );
};
