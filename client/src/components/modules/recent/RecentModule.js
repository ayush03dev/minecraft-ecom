import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import './RecentModule.css';

function RecentModule() {
    const [recent, setRecent] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getRecent() {
            setLoading(true);
            const url = '/api/transaction/recent';

            try {
                const response = await axios.get(url);
                console.log(response.data);
                const recent = response.data;
                setRecent(recent);
                setLoading(false)
            } catch (error) {
                setLoading(false);
            }
        }

        getRecent();
    }, []);


    return (
        <div className="module recent-module">
        <h6>Recent Donations</h6>
            {loading ? <>Loading...</> :
            <>{recent.map((r, id) => <div key={id} className="recent-row">
                <Row>
                <Col xl={2}>
                <img style={{width: '32px', height:'32px'}} src={`${r.player.skin}`} />
                </Col>

                <Col xl={8}>
                    {r.player.name}
                </Col>

                <Col xl={2}>
                    ${r.package.price}
                </Col>
                </Row> 
                </div>)}</>}

        </div>


    )
}

export default RecentModule;
