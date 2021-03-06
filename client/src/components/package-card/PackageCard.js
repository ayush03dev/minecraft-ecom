import React, { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
import Button from '@mui/material/Button';
import PackageModal from '../package-modal/PackageModal';
import './PackageCard.css';
import { Typography } from '@mui/material';

function PackageCard({ image, title, description, price, currency, packageId, playerId, setPaid }) {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="package-card">
            <center><img className="card-image" src={image} alt="package image" /></center>
            <div className="card-body">
            <Typography variant='h5'>{title}</Typography>
            <hr/>
            {/* <p>{description}</p> */}
            <center><Typography  variant='h6' sx={{color: 'white'}}>${price} {currency}</Typography></center>
            <br />
            <div className="d-grid">
            <Button size="medium" variant='contained' sx={{background: '#171C28'}} className="buy-btn"
             onClick={() => setModalShow(true)}>Purchase</Button>
            </div>
            </div>

            <PackageModal packageName={title} packagePrice={price} show={modalShow} onHide={() => setModalShow(false)}
            packageId={packageId} playerId={playerId} setPaid={setPaid} />
        </div>
    )
}

export default PackageCard;