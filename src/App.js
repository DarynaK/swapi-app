import React from 'react';
import './App.css';
import  Header from './components/Header';
import Routes from './Routes';
import './styles/main.scss'
import {
    BrowserRouter as Router,
} from "react-router-dom";
import useScrollInfo from 'react-element-scroll-hook';

function App() {
    const [scrollInfo, setRef] = useScrollInfo();
        return (
            <div className="App scrollbar" ref={setRef}>
                <Router>
                    <Header scrollValue={scrollInfo.y.value}/>
                    <Routes/>
                </Router>
            </div>
        );
}

export default App;
