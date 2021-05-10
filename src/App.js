import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { BrowserRouter, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { createUploadLink } from "apollo-upload-client";
import { Home, Register, Login, SinglePost, Profile } from "./pages/index";
import { Container } from "semantic-ui-react";
import MenuBar from "./components/MenuBar";
import Particles from "react-particles-js";

const App = () => {
  const httpLink = createUploadLink({
    uri: process.env.REACT_APP_GRAPHQL_LINK,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    const customHeaders = operation.getContext().hasOwnProperty("headers")
      ? operation.getContext().headers
      : {};
    operation.setContext({
      headers: {
        ...customHeaders,
      },
    });
    return forward(operation);
  });

  const client = new ApolloClient({
    link: authMiddleware.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <CookiesProvider>
        <BrowserRouter>
          <Particles
            style={{ position: "fixed", width: "100vw", height: "100vh" }}
            params={particlesConfig}
          />
          <Container>
            <MenuBar />
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/post/:postID" component={SinglePost} />
          </Container>
        </BrowserRouter>
      </CookiesProvider>
    </ApolloProvider>
  );
};

const particlesConfig = {
  particles: {
    number: {
      value: 65,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    // color: {
    //   opacity: "0.1",
    //   value: "#0000AF",
    // },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 2,
      random: false,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#000000",
      opacity: 0.1,
      width: 4,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: false,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};

export default App;
