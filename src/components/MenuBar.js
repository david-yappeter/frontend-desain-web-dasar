import React, { Fragment, useState, useEffect } from "react";
import { Menu, Sidebar, Segment, Icon, Dropdown } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { useLazyQuery } from "@apollo/client";
import { USER_ME } from "../graphqls/index";
import { useWindowWidth } from "../utils/hooks";

const MenuBar = () => {
  const windowWidth = useWindowWidth();
  const [visible, setVisible] = useState(false);
  const [cookies, _, removeCookies] = useCookies();
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);
  const [meUser, { loading, called, data }] = useLazyQuery(USER_ME, {
    context: {
      headers: {
        Authorization: cookies.access_token
          ? "Bearer " + cookies.access_token
          : "",
      },
    },
  });
  const options = [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{data?.me.name}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "profile",
      text: (
        <Link style={{ textDecoration: "none", color: "black" }} to="/profile">
          Your Profile
        </Link>
      ),
      value: "profile",
    },
    {
      key: "sign-out",
      text: (
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/login"
          onClick={() => handleLogout()}
        >
          Sign Out
        </Link>
      ),
      value: "signOut",
    },
  ];

  useEffect(() => {
    if (cookies.access_token) {
      meUser();
    }
  }, [cookies.access_token]);

  const handleLogout = () => {
    removeCookies("access_token");
  };

  const handleItemClick = (_, { name }) => {
    setActiveItem(name);
  };

  if (cookies.access_token) {
    const decodedToken = jwtDecode(cookies.access_token);
    if (decodedToken < Date.now()) {
      removeCookies("access_token");
    }
  }

  const menuBar = cookies.access_token ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={data?.me.name} active as={Link} to="/" />
      <Menu.Menu position="right">
        {/* <Menu.Item name="Logout" as={Link} to="/login" onClick={handleLogout} /> */}
        <Menu.Item>
          <Dropdown
            style={{ color: "teal" }}
            options={options}
            trigger={
              <span>
                <Icon name="user" />
              </span>
            }
          />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      {!cookies.access_token && (
        <Menu.Menu position="right">
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
        </Menu.Menu>
      )}
    </Menu>
  );

  return menuBar;
};

export default MenuBar;
