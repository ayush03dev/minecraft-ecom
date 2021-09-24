import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import {
  Switch,
  Route,
} from "react-router-dom";
import axios from 'axios';
import PackageBox from './components/package-box/PackageBox';
import { connect } from 'react-redux';
import Login from './components/login/Login';
import { requestData, logout } from './actions/playerActions';
import { useHistory } from 'react-router-dom';
import RecentModule from './components/modules/recent/RecentModule';
import PlayerModule from './components/modules/player/PlayerModule';
import TopModule from './components/modules/top/TopModule';

function App({ loading, player, requestData, logout }) {

  const [categories, setCategories] = useState([]);
  const navigate = useHistory();

  const onChangeAccount = (event) => {
    event.preventDefault();
    localStorage.removeItem('concordia-player');
    logout();
    // navigate.push('/login')
  }

  useEffect(() => {
    const getData = async () => {
    const cat = await axios.get('/api/category');
    setCategories(cat.data);
   }

   if (localStorage.getItem("concordia-player")) {
     requestData(localStorage.getItem("concordia-player"));
   }

   getData();

   const script = document.createElement('script');
   script.src = "https://www.paypalobjects.com/api/checkout.js";
   document.body.appendChild(script);

  }, [])

  return (
    <>
      {loading.loading ? <Spinner className="spinner" animation="border" variant="success" size="lg" /> : 
        <><Navbar categories={categories} />
        <Container className="body-container">
          <Row>
            <Col md={9}>
              <Switch>
              <Route path='/login'>
                  <Login />
                </Route>                
                <Route path='/category/:id'>
                  <PackageBox />
                </Route>
              </Switch>
            </Col>

            <Col md={3}>

            {player.name ? 
              <PlayerModule player={player} onChangeAccount={onChangeAccount}/>
              : <></>}
              <TopModule player={player} />
              <RecentModule player={player} />
            </Col>
          </Row>
        </Container>
        </>}
      </>
  );
}

const mapStateToProps = state => ({
  player: state.player,
  loading: state.loading
})

export default connect(mapStateToProps, {requestData, logout})(App)