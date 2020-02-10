import React from 'react';
import './App.css';
import  Header from './components/Header';
import Routes from './Routes';
import './styles/main.scss'

function App() {
        return (
            <div className="App">
                <Header/>
                <Routes/>
            </div>
        );
}

export default App;
