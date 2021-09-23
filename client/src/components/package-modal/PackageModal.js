import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import './PackageModal.css';

function PackageModal({packageName, packagePrice, show, onHide, packageId, playerId, setPaid}) {
 
    useEffect(() => {
      if (show) {
        setTimeout(() => {
            window.paypal.Button.render({
                env: 'sandbox', 
                payment: function(data, actions) {
                  return actions.request.post('/api/transaction/create/', {
                    "package_id":packageId,
                    "uuid":playerId
                  })
                    .then(function(res) {
                      return res.id;
                    });
                },
    
                style: {
                    size: 'responsive',
                    color: 'gold',
                    shape: 'pill',
                    tagline: false,
                    label: 'pay',
                  },
    
                onAuthorize: function(data, actions) {
                  return actions.request.post('/api/transaction/execute/', {
                    orderID: data.orderID,
                    package_id:packageId,
                    uuid:playerId,
                    payerID: data.payerID
                  })
                    .then(function(res) {
                       setPaid(true);
                    });
                }
              }, '#paypal-button');
        }, 0)
      }
    }, [show])

    return (
        <Modal 
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Purchase Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{packageName}</h5>
          <p>
            You are purchasing {packageName}. It may take 5-10 mins after the payment is confirmed for you to
            receive your perks. Please contact admin in case of any issues.
          </p>
          <p>Cost: {packagePrice} USD</p>
        </Modal.Body>
        <hr/>
        {/* <Modal.Footer> */}
        <div id='#paypal-button' className='paypal-button'></div>
        {/* </Modal.Footer> */}
      </Modal>
    )
}

export default PackageModal
