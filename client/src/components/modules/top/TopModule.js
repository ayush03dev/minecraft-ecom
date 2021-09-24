import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import '../Module.css';

function TopModule({player}) {

    const [top, setTop] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getRecent() {
            setLoading(true);
            const url = '/api/transaction/top';

            try {
                const response = await axios.get(url);
                const top = response.data;
                setTop(top);
                setLoading(false)
            } catch (error) {
                setLoading(false);
            }
        }

        getRecent();
    }, [player]);
    return (
        <div className='module top-module'>
        <h6 className='module-title'>Top Donors</h6>
        <div className='module-content'>
            {loading ? <>Loading...</> :
                <>{top.map((r, id) => <div key={id} className="recent-row">
                    <Row>
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                    <img className='skin-avatar' src={`${r.data.skin}`} />
                    </Col>

                    <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                        <span className="player-name">{r.data.name}</span>
                    </Col>

                    <Col xl={3} lg={3} md={3} sm={3} xs={3}>
                        <span className="module-price">${r.totalSpent}</span>
                    </Col>
                    </Row> 
                    </div>)}
                </>
            }   
        </div>
    </div>
    )
}

export default TopModule;
