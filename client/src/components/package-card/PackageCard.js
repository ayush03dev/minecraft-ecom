import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PackageModal from '../package-modal/PackageModal';
import './PackageCard.css';

function PackageCard({ image, title, description, price, currency, packageId, playerId, setPaid }) {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="package-card">
            <center><img className="card-image" src={image} alt="package image" /></center>
            <div className="card-body">
            <h5>{title}</h5>
            <hr/>
            {/* <p>{description}</p> */}
            <center><h5 className="price">${price} {currency}</h5></center>
            <div className="d-grid">
            <Button variant="success" size="full-width" className="buy-btn"
             onClick={() => setModalShow(true)}>Purchase</Button>
            </div>
            </div>

            <PackageModal packageName={title} packagePrice={price} show={modalShow} onHide={() => setModalShow(false)}
            packageId={packageId} playerId={playerId} setPaid={setPaid} />
        </div>
    )
}

export default PackageCard;