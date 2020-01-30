import React from 'react';
import './App.css';
import {Header} from "./header/Header";
import {Content} from "./content/Content";
import {Footer} from "./footer/Footer";

const App: React.FC = () => {
  return (
    <div className="App">
        <Header/>
        <Content/>
        <Footer />
    </div>
  );
};

export default App;
