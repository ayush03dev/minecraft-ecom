import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './material/components/Navbar';
import { Spinner } from 'react-bootstrap';
import {Container} from '@mui/material'
import {
  Switch,
  Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import { requestData, logout } from './actions/playerActions';

import Store from './pages/Store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';


const theme = createTheme();

function App({ loading }) {

  useEffect(() => {
   const script = document.createElement('script');
   script.src = "https://www.paypalobjects.com/api/checkout.js";
   document.body.appendChild(script);
  }, []);


  return (
        <ThemeProvider theme={theme}>
        <div className="app">
        
        {loading.loading ? <Spinner className="spinner" animation="border" variant="success" size="lg" /> :
          <Switch>
              <Route path='/store'>
                  <>
                    <Navbar />
                    <Container maxWidth='lg' className="body-container">
                    <Store />
                    </Container>
                  </>
                </Route>
          </Switch>}
      </div>
      </ThemeProvider>
  );
}

const mapStateToProps = state => ({
  loading: state.loading
})

export default connect(mapStateToProps, {requestData, logout})(App)