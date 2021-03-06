import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">

        <h1 className="heading">The Gossip <span className="tm">  TM</span> </h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        
        <Link onClick={e => (!name) ? e.preventDefault() : null} to={`/chat?name=${name}`}>
          <button className={'button mt-20'} type="submit">Join Room</button>
        </Link>
      </div>
    </div>
  );
}