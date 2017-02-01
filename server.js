const express    = require('express');
const http       = require('http');
const bodyParser = require('body-parser');   			// parses request bodies
const morgan     = require('morgan');        			// logging middleware
const cors       = require('cors');          			// allows Cross-Origin-Requests
const router     = require('./router');      			// express router
const debug 		 = require('debug')('app:server');// debug logging utility

const app = express();
const PORT = process.env.PORT || 3090;
const MODE = process.env.MODE;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use('/', router);
app.use(express.static(__dirname + '/public'));

const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', s => {
	s.on('signal', data => {
		s.broadcast.emit(data.type, data);
	});
});

server.listen(PORT);
console.log(`Listening on ${PORT}...`);  