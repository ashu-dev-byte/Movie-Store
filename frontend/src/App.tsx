import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home";
import Content from "./components/Content/Content";
import Actor from "./components/Actor/Actor";
import Director from "./components/Director/Director";
import Studio from "./components/Studio/Studio";
import AddActor from "./components/Actor/AddActor";
import AddContent from "./components/Content/AddContent";
import AddDirector from "./components/Director/AddDirector";
import AddStudio from "./components/Studio/AddStudio";
import ContentDetails from "./components/Content/ContentDetails";
import ActorDetails from "./components/Actor/ActorDetails";
import DirectorDetails from "./components/Director/DirectorDetails";
import StudioDetails from "./components/Studio/StudioDetails";
import "./App.scss";

const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app">
          <Navbar />
          <div className="main">
            <Sidebar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/contents" component={Content} />
              <Route exact path="/actors" component={Actor} />
              <Route exact path="/directors" component={Director} />
              <Route exact path="/studios" component={Studio} />
              <Route exact path="/add/content" component={AddContent} />
              <Route exact path="/add/actor" component={AddActor} />
              <Route exact path="/add/director" component={AddDirector} />
              <Route exact path="/add/studio" component={AddStudio} />
              <Route path="/content/:contentId" component={ContentDetails} />
              <Route path="/actor/:actorId" component={ActorDetails} />
              <Route path="/director/:directorId" component={DirectorDetails} />
              <Route path="/studio/:studioId" component={StudioDetails} />
            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
