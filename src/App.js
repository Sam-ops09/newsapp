import './App.css';

import LoadingBar from 'react-top-loading-bar';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const App = () => {
    const pageSize = 6;
    const apiKey= process.env.REACT_APP_NEWS_API
    const [progress, setProgress] = useState(0)

    return (
        <div>
            <Router>                
                <Navbar />
                <LoadingBar
                    height={3}
                    color='#ff7c05'
                    progress={progress}
                />
                <Switch>
                    <Route exact path='/'><News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country='in' category="General"/></Route>
                    <Route exact path='/Entertainment'><News setProgress={setProgress} apiKey={apiKey} key="Entertainment" pageSize={pageSize} country='in' category="Entertainment"/></Route>
                    <Route exact path='/Business'><News setProgress={setProgress} apiKey={apiKey} key="Business" pageSize={pageSize} country='in' category="Business"/></Route>
                    <Route exact path='/Health'><News setProgress={setProgress} apiKey={apiKey} key="Health" pageSize={pageSize} country='in' category="Health"/></Route>
                    <Route exact path='/Science'><News setProgress={setProgress} apiKey={apiKey} key="Science" pageSize={pageSize} country='in' category="Science"/></Route>
                    <Route exact path='/Sports'><News setProgress={setProgress} apiKey={apiKey} key="Sports" pageSize={pageSize} country='in' category="Sports"/></Route>
                    <Route exact path='/Technology'><News setProgress={setProgress} apiKey={apiKey} key="Technology" pageSize={pageSize} country='in' category="Technology"/></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;