// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PainSurveyForm from './components/PainSurveyForm';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>שאלון תיאור כאב חזותי</h1>
                    <nav>
                        <Link to="/">Home</Link>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={<PainSurveyForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
