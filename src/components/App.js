import React from 'react';
import { SignIn } from './';
import {Switch, Route} from 'react-router-dom';

function Home() {
  return <div> Home </div>
}

function App() {
  return (
    <div className="App">
      Slack
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
