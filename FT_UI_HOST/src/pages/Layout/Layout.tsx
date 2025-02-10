import { useTheme } from "@pluralsight/react";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MfeBasePrefix } from "../../shared/constants";

import { SunIcon, SignoutIcon } from "@pluralsight/icons";

import styles from "./Layout.module.css";
import { selectIsLoggedIn } from "../../hooks/useStoreSelector";
import { useSelector } from "react-redux";
import useStore from "../../hooks/useStore";

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { setLoggedInContainer } = useStore();

  const { theme, updateTheme } = useTheme();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    updateTheme(newTheme);
  };

  const handleSignOut = (event: React.MouseEvent<SVGSVGElement>): void => {
    event.preventDefault();
    setLoggedInContainer(!isLoggedIn);
    localStorage.removeItem("username");
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate(`/home`);
  };

  return (
    <>
      <nav className={styles.navBar}>
        {isLoggedIn && (
          <Link to={`/${MfeBasePrefix.dashboard}/`}>Dashboard</Link>
        )}
        {isLoggedIn && (
          <Link to={`/${MfeBasePrefix.transactions}`}>Transactions</Link>
        )}
        <Link to={`home`}>Home</Link>
        {!isLoggedIn && <Link to={`/${MfeBasePrefix.auth}/login`}>Login</Link>}
        <SunIcon
          className={styles.iconCustom}
          onClick={handleToggleTheme}
          aria-label="Change Theme"
        />
        {isLoggedIn && (
          <SignoutIcon
            className={styles.iconCustom}
            onClick={handleSignOut}
            aria-label="Sign Out"
          />
        )}
      </nav>
      <Outlet />
    </>
  );
};
