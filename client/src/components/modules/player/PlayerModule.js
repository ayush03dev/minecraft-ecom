import React from 'react';
import { Button } from 'react-bootstrap';
import '../Module.css';
import './PlayerModule.css';

function PlayerModule({ player, onChangeAccount }) {
    return (
        <div className="module player-module">
        <h6 className="module-title">Player Information</h6>
        <div className="module-content player-module-content">
            <div className="player-info">
            <img style={{width: '64px'}} src={player.avatar} alt='player avatar' />
            <p className="player-name">IGN: <b>{player.name}</b></p>
            <Button variant="danger" size="sm" href='/store/login' onClick={onChangeAccount}>Change MC Account</Button>
            </div>
        </div>
      </div>
    )
}

export default PlayerModule;
