'use strict'
import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import "./search.css";
import logo from "./assets/darts.jpg";

const Search = () => {
    return <div className='search-text'>Search Text
        <img src={logo} className='search-image' /></div>
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<Search />)