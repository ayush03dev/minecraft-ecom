import React, { useEffect, useState } from 'react';
import PackageCard from '../package-card/PackageCard';
import './PackageBox.css';
import { Redirect, useParams } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import { Grid, Typography } from '@mui/material';


function PackageBox({ player, loading: gLoading }) {
  
    const params = useParams();
    const category_id = params.id;
    const [loading, setLoading] = useState(true);
    const [packages, setPackages] = useState([]);
    const [paid, setPaid] = useState(false);


    useEffect(() => {
      async function pullPackages() {
        const url = `/api/category/${category_id}/packages`;
        try {
          const response = await axios.get(url);
          setPackages(response.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      }

      pullPackages();
    }, []);


    if (loading || gLoading.loading) return <div>Loading...</div>;
    if (!player.success) {
      return <Redirect to='/store/login'/>;
    }

    if (paid) {
      return <div className="paid-success">
      <img src='/check.png' alt="Success"/>
      <br/>
      <br />
      <h2 style={{color: 'white'}}>Purchase Successful!</h2></div>
    }

    return (
      <div className="card-container">
        <Typography color='white' variant='h5' sx={{background: '#1C2033'}}>Ranks</Typography>

      <div style={{padding: '2rem 0rem'}}>
      <Grid container spacing={4}>
        {packages.length === 0 ? <div>Not Found</div> : <></>} 
        {packages.map((p, id) => (
          <Grid item key={id} lg={4} md={6} xs={12}>
          <PackageCard
           image="https://dunb17ur4ymx4.cloudfront.net/packages/images/e6d6709c969b73397cd84cf77c96fa3619284d85.png"
           title={p.name}
           description={p.description}
           price={p.price}
           currency={p.currency}
           packageId={p._id}
           playerId={player.id}
           setPaid={setPaid}
           />
           </Grid>))}
        </Grid>
        </div>
    </div>
    )
}

const mapStateToProps = state => ({
  player: state.player,
  loading: state.loading
})

export default connect(mapStateToProps, {})(PackageBox);
