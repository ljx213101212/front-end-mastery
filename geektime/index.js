'use strict'
import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import "./search.css";
import logo from "./assets/darts.jpg";
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
        // console.log("[JX TEST] - associateJS", associateJS);
    }, []);
    return <div className='search-text'>Search Textsss test
        <img src={logo} className='search-image' /></div>
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<Search />)