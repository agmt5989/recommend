'use strict';

const express = require('express');
const bp = require('body-parser');
const exec = require('child_process').exec;
const app = express();
const hbs = require('express-handlebars');

app.use(bp.json());
app.use(bp.urlencoded({
	extended: false,
}));

app.engine('handlebars', hbs({
	defaultLayout: 'main',
	layoutsDir: __dirname + '/views/layouts/'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
//	res.json({message: 'Well, we seem to have made it!'});
	res.render('index');
});

app.get('/start', (req, res) => {
	exec('python app.py ' + req.query.id, (err, stdout, stderr) => {
		if (err) {
			console.log("Couldn't execute");
			res.json({errpr: true, message: 'Failed to execute command.'});
		} else if (stdout) {
			// the *entire* stdout and stderr (buffered)
			console.log(`stdout: ${stdout}`);
			res.json({response: stdout});
		} else {
			console.log(`stderr: ${stderr}`);
			res.json({response: stderr});
		}

	});
});

app.listen(3000, () => {
	console.log('We have arrived');
});
