import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const MenuBar = () => {
  const [cookies] = useCookies();
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (_, { name }) => {
    setActiveItem(name);
  };

  return (
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
};

export default MenuBar;
