'use strict';

const express = require('express');
const path = require('path');
const bp = require('body-parser');
const exec = require('child_process').exec;
const app = express();
const hbs = require('express-handlebars');

app.use(bp.json());
app.use(bp.urlencoded({
	extended: false,
}));

app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/end', (req, res) => {
	exec('python project.py ' + req.query.id + ' ' + req.query.no, (err, stdout, stderr) => {
		if (err) {
			console.log("Couldn't execute");
			res.json({errpr: true, message: 'Failed to execute command.'});
		} else if (stdout) {
			// the *entire* stdout and stderr (buffered)
			let resArray = stdout.split('\n');
			let result = resArray[2];
			let bulk = result.split("]', '[");
			result = "real: " + bulk[0] + "]', recommend: '[" + bulk[1];
//			result = JSON.parse(result);
			console.log(result);
//			console.log(`stdout: ${resArray}`);
			res.json(result);
		} else {
			console.log(`stderr: ${stderr}`);
			res.json({response: stderr});
		}

	});
});

app.listen(3000, () => {
	console.log('We have arrived');
});
