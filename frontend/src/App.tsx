import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import Actor from "./components/Actor/Actor";
import Director from "./components/Director/Director";
import Studio from "./components/Studio/Studio";
import "./App.scss";

const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <Navbar />
        <div className="main">
          <Sidebar />
          <Content />
        </div>
      </div>
    </ApolloProvider>
  );
};

export default App;
