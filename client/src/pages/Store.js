import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import Login from '../components/login/Login';
import PackageBox from '../components/package-box/PackageBox';
import PlayerModule from '../components/modules/player/PlayerModule';
import TopModule from '../components/modules/top/TopModule';
import RecentModule from '../components/modules/recent/RecentModule';
import { connect } from 'react-redux';
import { requestData, logout } from '../actions/playerActions';
import { Grid } from '@mui/material';

function Store( { player, logout, ...rest }) {
    const onChangeAccount = (event) => {
        event.preventDefault();
        localStorage.removeItem('concordia-player');
        logout();
      }
      
      useEffect(() => {
       if (localStorage.getItem("concordia-player")) {
           if (!player.name) {
            rest.requestData(localStorage.getItem("concordia-player"));
          }
       }    
      }, []);


    return (
        <div style={{padding: '0 16px', alignContent: 'center'}}>
            <Grid container spacing={3}>
            <Grid item md={9} xs={12}>
              <Switch>
              <Route path='/store/login' exact>
                  <Login />
                </Route>                
                <Route path='/store/category/:id'>
                  <PackageBox />
                </Route>
              </Switch>
            </Grid>

            <Grid item md={3} xs={12}>

            {player.name ? 
              <PlayerModule player={player} onChangeAccount={onChangeAccount}/>
              : <></>}
              <TopModule player={player} />
              <RecentModule player={player} />
            </Grid>
          </Grid>
        </div>
    )
}

const mapStateToProps = state => ({
    player: state.player,
    loading: state.loading
  })
  
  export default connect(mapStateToProps, {requestData, logout})(Store)
