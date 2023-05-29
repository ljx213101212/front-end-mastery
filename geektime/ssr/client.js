import React from 'react';
import { hydrateRoot } from 'react-dom/client';

import App from "./index";

const container = document.getElementById('root');
hydrateRoot(container, <App />)
