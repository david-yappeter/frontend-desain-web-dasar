import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { BrowserRouter, Route } from "react-router-dom";
import { Home, Register, Login } from "./pages/index";
import { Container } from "semantic-ui-react";
import MenuBar from "./components/MenuBar";

const App = () => {
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_LINK,
  });
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
