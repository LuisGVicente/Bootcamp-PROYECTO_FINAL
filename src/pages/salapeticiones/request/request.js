import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import './request.css';

function request(props){
  

    return(
      <div className="container">
          <h1>{props}</h1>
      </div>
    )
  

    }

export default request;