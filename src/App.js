import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';

import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import ErrorPage from './pages/ErrorPage';
import { ContentfulHotelProvider } from './stores/ContentfulHotelContext';

function App() {
  return (
    <div className="App">
      <ContentfulHotelProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/room/:slug" component={RoomPage} />
            <Route exact path="/error" component={ErrorPage} />
            <Route component={ErrorPage} />
          </Switch>
        </BrowserRouter>
      </ContentfulHotelProvider>
    </div>
  );
}

export default App;
