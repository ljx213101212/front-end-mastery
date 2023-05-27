'use strict'
import React, { useEffect, StrictMode } from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import "./index.css";
import logo from "./../assets/darts.jpg";
import associateHTML from "raw-loader!./raw_meta.html";
import associateJS from "raw-loader!./raw_js.js";

const Search = () => {

    useEffect(() => {
        //inline meta data
        document.head.innerHTML += associateHTML;
        //inline javascript
        const scriptTag = document.createElement('script');
        scriptTag.innerHTML += associateJS;
        document.body.appendChild(scriptTag);
    }, []);
    return <div className='search-text'>Search Textsss test
        <img src={logo} className='search-image' /></div>
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<StrictMode><Search /></StrictMode>)