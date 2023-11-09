const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const urlobj = new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000');
const hostname = urlobj.hostname;
const port = parseInt(process.env.PORT ?? '3000', 10);
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.all('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});
