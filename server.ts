import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const hostname = '127.0.0.1';
const port = 3000;
const clientFolder = path.join(__dirname, 'client');

const server = http.createServer((req, res) => {
	const filePath = path.join(clientFolder, req.url === '/' ? 'index.html' : req.url!);
	const ext = path.extname(filePath);
	const contentType = getContentType(ext);

	fs.readFile(filePath, (err, data) => {
		if (err) {
			if (err.code === 'ENOENT') {
				res.statusCode = 404;
				res.setHeader('Content-Type', 'text/plain');
				res.end('404 Not Found');
			} else {
				res.statusCode = 500;
				res.setHeader('Content-Type', 'text/plain');
				res.end('500 Internal Server Error');
			}
		} else {
			res.statusCode = 200;
			res.setHeader('Content-Type', contentType);
			res.end(data);
		}
	});
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

function getContentType(ext: string): string {
	switch (ext) {
		case '.html':
			return 'text/html';
		case '.css':
			return 'text/css';
		case '.js':
			return 'application/javascript';
		case '.json':
			return 'application/json';
		case '.png':
			return 'image/png';
		case '.jpg':
		case '.jpeg':
			return 'image/jpeg';
		case '.gif':
			return 'image/gif';
		default:
			return 'application/octet-stream';
	}
}