import React from 'react';

import back from '../../../assets/icons/flecha.svg';

import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
    <a href="/"><img className="flecha" src={back} alt="close icon" /></a>
      <h3>{room}</h3>
    </div>
    
  </div>
);

export default InfoBar;