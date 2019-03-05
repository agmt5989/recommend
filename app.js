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
			let bulk = result.replace(/[()]/g,'').split("]', '[");
//			result = "{\"real\":" + bulk[0] + "], \"recommend\":[" + bulk[1] + "}";
//			result = JSON.parse(result);
//			console.log(result);
//			console.log(`stdout: ${resArray}`);
//			result = "{\"recommend\":[{\"CustomerID\":\"13047\",\"StockCode\":\"23298\",\"score\":0.1238362139,\"rank\":1,\"Description\":\"SPOTTY BUNTING\"},{\"CustomerID\":\"13047\",\"StockCode\":\"21212\",\"score\":0.0934958344,\"rank\":2,\"Description\":\"PACK OF 72 RETROSPOT CAKE CASES\"},{\"CustomerID\":\"13047\",\"StockCode\":\"22666\",\"score\":0.0892609936,\"rank\":3,\"Description\":\"RECIPE BOX PANTRY YELLOW DESIGN\"},{\"CustomerID\":\"13047\",\"StockCode\":\"22993\",\"score\":0.0876116879,\"rank\":4,\"Description\":\"SET OF 4 PANTRY JELLY MOULDS\"},{\"CustomerID\":\"13047\",\"StockCode\":\"23243\",\"score\":0.0851479456,\"rank\":5,\"Description\":\"SET OF TEA COFFEE SUGAR TINS PANTRY\"}],";

//			result += "\"real\":[{\"CustomerID\":13047,\"StockCode\":\"21754\",\"count\":1,\"Description\":\"HOME BUILDING BLOCK WORD\"},{\"CustomerID\":13047,\"StockCode\":\"21755\",\"count\":1,\"Description\":\"LOVE BUILDING BLOCK WORD\"},{\"CustomerID\":13047,\"StockCode\":\"21756\",\"count\":1,\"Description\":\"BATH BUILDING BLOCK WORD\"},{\"CustomerID\":13047,\"StockCode\":\"21777\",\"count\":1,\"Description\":\"RECIPE BOX WITH METAL HEART\"},{\"CustomerID\":13047,\"StockCode\":\"22310\",\"count\":1,\"Description\":\"IVORY KNITTED MUG COSY \"},{\"CustomerID\":13047,\"StockCode\":\"22622\",\"count\":1,\"Description\":\"BOX OF VINTAGE ALPHABET BLOCKS\"},{\"CustomerID\":13047,\"StockCode\":\"22623\",\"count\":1,\"Description\":\"BOX OF VINTAGE JIGSAW BLOCKS \"},{\"CustomerID\":13047,\"StockCode\":\"22745\",\"count\":1,\"Description\":\"POPPY'S PLAYHOUSE BEDROOM \"},{\"CustomerID\":13047,\"StockCode\":\"22748\",\"count\":1,\"Description\":\"POPPY'S PLAYHOUSE KITCHEN\"},{\"CustomerID\":13047,\"StockCode\":\"22749\",\"count\":1,\"Description\":\"FELTCRAFT PRINCESS CHARLOTTE DOLL\"},{\"CustomerID\":13047,\"StockCode\":\"22912\",\"count\":1,\"Description\":\"YELLOW COAT RACK PARIS FASHION\"},{\"CustomerID\":13047,\"StockCode\":\"22913\",\"count\":1,\"Description\":\"RED COAT RACK PARIS FASHION\"},{\"CustomerID\":13047,\"StockCode\":\"22914\",\"count\":1,\"Description\":\"BLUE COAT RACK PARIS FASHION\"},{\"CustomerID\":13047,\"StockCode\":\"22960\",\"count\":1,\"Description\":\"JAM MAKING SET WITH JARS\"},{\"CustomerID\":13047,\"StockCode\":\"48187\",\"count\":1,\"Description\":\"DOORMAT NEW ENGLAND\"},{\"CustomerID\":13047,\"StockCode\":\"84879\",\"count\":1,\"Description\":\"ASSORTED COLOUR BIRD ORNAMENT\"},{\"CustomerID\":13047,\"StockCode\":\"84969\",\"count\":1,\"Description\":\"BOX OF 6 ASSORTED COLOUR TEASPOONS\"},{\"CustomerID\":13047,\"StockCode\":\"M\",\"count\":1,\"Description\":\"Manual\"}]}";

//			result = JSON.parse(result);
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
