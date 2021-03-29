import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { USER_ME } from "../graphqls/index";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
};

const useToken = () => {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies();
  const [meUser, { loading, data }] = useLazyQuery(USER_ME, {
    context: {
      headers: {
        Authorization: cookies.access_token
          ? `Bearer ${cookies.access_token}`
          : "",
      },
    },
  });
  useEffect(() => {
    waitAsync();
    return () => {};
  }, [cookies.access_token]);

  useEffect(() => {
    setUser(data ? data : null);
  }, [data]);

  const waitAsync = async () => {
    await meUser();
  };

  return user;
};

const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
    setValues(initialState);
  };

  return {
    onSubmit,
    onChange,
    values,
  };
};

export { useForm, useWindowWidth, useToken };
