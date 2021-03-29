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
import { createUploadLink } from 'apollo-upload-client'
import { Home, Register, Login , SinglePost, Profile} from "./pages/index";
import { Container } from "semantic-ui-react";
import MenuBar from "./components/MenuBar";

const App = () => {
  const httpLink = createUploadLink({
    uri: process.env.REACT_APP_GRAPHQL_LINK,
  })

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

export default App;
