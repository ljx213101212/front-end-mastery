'use strict'
import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import "./search.css";

const Search = () => {
    return <div className='search-text'>Search Text</div>
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<Search />)