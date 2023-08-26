import React, { useState } from "react";
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
 } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";

function AppRouter({isLoggedIn}) {
    return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <Route path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  )
}

export default AppRouter;