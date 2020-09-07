import * as React from 'react'
import logo from './logo.svg';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './App.css';

import ComponentOne from './component-one/component-one';
import ComponentTwo from './component-two/component-two.component';
import Board from './board/board.component';
import { DatastoreService, State, initialState } from './services/datastore.service';
class App extends React.Component<object, State> {
  readonly state: State = initialState;
  render() {

  return (
    <Router>
    <DatastoreService.Provider value={this.state}>
        This is Provider Section
     
    <div>
      <nav className="navigation">
       <Link className="navigation navigation--item" to="/"> Home </Link>
       <Link className="navigation navigation--item" to="/board"> Board </Link>
       <Link className="navigation navigation--item" to="/two"> Two </Link>
      </nav>
      <Switch>
        <Route exact path="/" component={ComponentOne} />
        <Route exact path="/board" component={Board} />
        <Route exact path="/two" component={ComponentTwo} />
      </Switch>
    </div>
       </DatastoreService.Provider>
    </Router>
  );
  }
}

export default App;
