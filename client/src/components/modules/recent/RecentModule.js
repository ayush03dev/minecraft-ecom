import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../Module.css';
import './RecentModule.css';

function RecentModule({player}) {
    const [recent, setRecent] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getRecent() {
            setLoading(true);
            const url = '/api/transaction/recent';

            try {
                const response = await axios.get(url);
                const recent = response.data;
                setRecent(recent);
                setLoading(false)
            } catch (error) {
                setLoading(false);
            }
        }

        getRecent();
    }, [player]);


    return (
        <div className='module recent-module'>
            <h6 className='module-title'>Recent Donations</h6>
            <div className='module-content'>
                {loading ? <>Loading...</> :
                    <>{recent.map((r, id) => <div key={id} className="recent-row">
                        <Row>
                        <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                        <img className='skin-avatar' src={`${r.player.skin}`} />
                        </Col>

                        <Col xl={7} lg={7} md={7} sm={7} xs={7}>
                            <span className="player-name">{r.player.name}</span>
                        </Col>

                        <Col xl={3} lg={3} md={3} sm={3} xs={3}>
                            <span className="module-price">${r.package.price}</span>
                        </Col>
                        </Row> 
                        </div>)}
                    </>
                }   
            </div>
        </div>
    )
}

export default RecentModule;
