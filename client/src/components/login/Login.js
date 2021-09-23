import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { requestData } from '../../actions/playerActions';
import './Login.css';

function Login({ requestData, player }) {
    const [username, setUsername] = useState("");
    const history = useHistory();

    useEffect(() => {
        const { name } = player;
        if (name !== null && name !== undefined) {
            localStorage.setItem('concordia-player', name);
            console.log('pushing...');
            history.push('/category/ranks');
        }
    }, [history, player])

    const onTextChange = event => {
        setUsername(event.target.value);
    }

    const onClick = async event => {
        event.preventDefault();
        console.log(username);
        await requestData(username);
    }

    return (
        <div className="login">
            <Form>
            <Form.Group>
            <span><b>Enter your Minecraft username to continue</b></span><br/>
            <hr/>
            <input onChange={onTextChange} name="username" value={username} className="username-field" type="text" /><br/><br/>
            <Button className="submit-btn" variant="success" onClick={onClick} type="submit">
                Submit
            </Button>
            </Form.Group>
            </Form>
        </div>
    )
}

const mapStateToProps = state => ({
    player: state.player
})

export default connect(mapStateToProps, {requestData})(Login) ;
