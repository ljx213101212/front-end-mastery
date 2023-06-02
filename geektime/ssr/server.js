if (typeof window === 'undefined') {
    global.window = {};
}

const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../../geekssrdist/server');
const template = fs.readFileSync(path.join(__dirname, '../../geekssrdist/server.html'), 'utf-8');
const data = require('./data.json');

const server = (port) => {
    const app = express();

    app.use(express.static('../../geekssrdist'));
    app.get('/ssr', (req, res) => {
        const html = renderMarkup(renderToString(SSR));
        res.status(200).send(html);
    });

    app.listen(port, () => {
        console.log('Server is running on port:' + port);
    });
};

server(process.env.PORT || 3000);

const renderMarkup = (str) => {
    console.log("[JX TEST] - renderMarkup", str);
    const dataStr = JSON.stringify(data);
    return template.replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.__initial_data=${dataStr}</script>`).replace('<!--HTML_PLACEHOLDER-->', str);
}