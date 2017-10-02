const express = require('express');
const path = require('path');

const hostname = 'localhost';
const port = 3000;
const app = express();

app.get('/', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.sendFile(path.join(__dirname, 'docs'));
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}`);
});
