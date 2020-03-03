import React from 'react';
import './App.css';
import  Header from './components/Header';
import Routes from './Routes';
import './styles/main.scss'
import {
    BrowserRouter as Router,
} from "react-router-dom";

function App() {
        return (
            <div className="App">
                <Router>
                    <Header/>
                    <Routes/>
                </Router>
            </div>
        );
}

export default App;
