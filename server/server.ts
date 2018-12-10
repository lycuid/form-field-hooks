import * as express from 'express';
import * as path from 'path';

const app = express();

app.use('/dist', express.static('dist'));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'index.html')));

app.listen('3000', () => console.log('listening on port 3000..'));