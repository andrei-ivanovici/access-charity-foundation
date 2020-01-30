import React from "react";
import './App.css';
import {Content} from "./content/Content";
import {MenuTop} from "./menu/Menu";
import {Footer} from "./footer/Footer";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import {About} from "./about/About";
const App: React.FC = () => {
  return (
      <Router>
    <div>
        <MenuTop/>
        <Switch>
            <Route path="/">
                <Content/>
            </Route>
            <Route path="/about">
                <About/>
            </Route>
        </Switch>
        <Footer/>
    </div>
      </Router>
  );
};

export default App;
