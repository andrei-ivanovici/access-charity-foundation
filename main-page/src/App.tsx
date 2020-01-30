import React from 'react';
import './App.css';
import {Header} from "./header/Header";
import {Content} from "./content/Content";
import {Footer} from "./footer/Footer";
import {EventDetails} from "./event-details/EventDetails";

const App: React.FC = () => {
  return (
    <div>
        <Header/>
        <Content/>
        <Footer />
    </div>
  );
};

export default App;
