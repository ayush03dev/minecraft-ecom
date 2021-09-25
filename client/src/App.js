import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { Container, Spinner } from 'react-bootstrap';
import {
  Switch,
  Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import { requestData, logout } from './actions/playerActions';

import Store from './pages/Store';

function App({ loading }) {

  useEffect(() => {
   const script = document.createElement('script');
   script.src = "https://www.paypalobjects.com/api/checkout.js";
   document.body.appendChild(script);
  }, []);

  return (
    <>
      {loading.loading ? <Spinner className="spinner" animation="border" variant="success" size="lg" /> : 
        <>
        <Navbar />
        <Container className="body-container">
          <Switch>
              <Route path='/store' component={Store} />
          </Switch>
        </Container>
        </>}
      </>
  );
}

const mapStateToProps = state => ({
  loading: state.loading
})

export default connect(mapStateToProps, {requestData, logout})(App)