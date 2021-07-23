import React from 'react';
import { client } from "./ApolloClient/client";
import { ApolloProvider } from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter
} from "react-router-dom";
import './App.css';

import Navbar from './components/Navbar.js';
import Menubar from './components/Menubar.js';
import Companies from './components/companies/Companies';
import Jobs from './components/jobs/Jobs';
import CompanyProfile from './components/companies/CompanyProfile';
import JobProfile from './components/jobs/JobProfile';
import PostJob from './components/post-job/PostJob';

function App() {
  return (
    <ApolloProvider client={client}>
      <HashRouter basename='/'>
        <div className="App">
          <Navbar></Navbar>
          <Menubar></Menubar>
          <div className="main__app">

            <Switch>
              <Route exact path="/">
                <Companies />
              </Route>
              <Route exact path="/companies">
                <Companies />
              </Route>
              <Route exact path="/companies/:slug">
                <CompanyProfile />
              </Route>
              <Route exact path="/jobs">
                <Jobs />
              </Route>
              <Route exact path="/jobs/:slug">
                <JobProfile />
              </Route>
              <Route exact path="/post-job">
                <PostJob />
              </Route>
            </Switch>

          </div>
        </div>
      </HashRouter>
    </ApolloProvider>
  );
}

export default App;
