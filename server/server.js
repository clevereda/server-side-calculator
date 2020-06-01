//bring in express
const express = require('express');

// Include the 'body-parser' module, which comes with express
// This allows us to access request.body on HTTP POSTs
// as a javascript object
const bodyParser = require('body-parser');

// Let's create our server object
const app = express();
//set up a port
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));


let history = [];

//HTTP GET REQUEST
// app.get('/guess', (req, res) => {
//     console.log('--> sending secret game info');
//     res.send(currentGame);
// });


// initialize answer to be computed
let answer = 0;

//HTTP POST REQUEST
app.post('/calculate', (req, res) => {
    console.log('User is trying to POST a calculation');
    console.log(req.body);
    const result = {
        first_input: 'n/a',
        last_input: 'n/a',
        operator_used: 'n/a',
        answer: 'n/a'
    }
    // force everything to a number
    req.body.input_one = Number(req.body.input_one);
    req.body.input_two = Number(req.body.input_two);

    //store operator use in a variable, nice and neat
    let operator = req.body.our_operator; 

    // perform calculations
    //case one is NaN
    if ((req.body.input_one === NaN) && (req.body.input_two === NaN)){
        console.log('Your input was not valid');

        //addition computation
    }else if ((req.body.input_one !== NaN) && (req.body.input_two !== NaN) && (operator === '+')) {
        answer = req.body.input_one + req.body.input_two;
        result.answer = answer;
        result.first_input = req.body.input_one;
        result.last_input = req.body.input_two;
        result.operator_used = operator;

        //subtraction computation
    } else if ((req.body.input_one !== NaN) && (req.body.input_two !== NaN) && (operator === '-')) {
        answer = req.body.input_one - req.body.input_two;
        result.answer = answer;
        result.first_input = req.body.input_one;
        result.last_input = req.body.input_two;
        result.operator_used = operator;

        //division computation
    } else if ((req.body.input_one !== NaN) && (req.body.input_two !== NaN) && (operator === '/')) {
        answer = req.body.input_one/req.body.input_two;
        result.answer = answer;
        result.first_input = req.body.input_one;
        result.last_input = req.body.input_two;
        result.operator_used = operator;
        
        //multiplication computation
    } else if ((req.body.input_one !== NaN) && (req.body.input_two !== NaN) && (operator === '*')){
        answer = req.body.input_one * req.body.input_two;
        result.answer = answer;
        result.first_input = req.body.input_one;
        result.last_input = req.body.input_two;
        result.operator_used = operator;
    }

    //add calculation to history array
    history.push(result);

    res.send(result);
});



//Send historical data
app.get('/history', (req, res) => {
    res.send(history);
});



app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});