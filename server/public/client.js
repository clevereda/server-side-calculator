
$(document).ready(compute);

//initialize operator picked
let operator = '';

//initialize initial inputs
let inputOne = 0;
let inputTwo = 0;

//function for calculating problem
function compute () {

//capturing the addition operator
$('.add').on('click', function(){
    operator = '+';
});

//capturing the subtraction operator
 $('.subtract').on('click', function () {
        operator = '-';
    });

//capturing the division operator
$('.divide').on('click', function () {
        operator = '/';
    });

//capturing the multiplication operator
 $('.multiply').on('click', function () {
        operator = '*';
    });

$('.equals').on('click', function (){
    inputOne = $('.numOne').val();
    inputTwo = $('.numTwo').val();
    

    //Packaging computation into an object
    const obj = {

        input_one: inputOne,
        input_two: inputTwo,
        our_operator: operator
    }

    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: obj
    }).then(function (response) {
        //it made it!
        console.log('The calculation has been submitted!', response);
    }).catch(function (response) {
        alert('Sorry, the calculation wasn\'t submitted');
    });

    //display computation history on the DOM
    displayHistory();
});

$('.reset').on('click', function () {

    //empty the inputs
    $('.numOne').val('');
    $('.numTwo').val('');
});


    
}



//Store Historial data
function displayHistory() {
    $.ajax({
        type: 'GET',
        url: '/history'
    }).then(function (response) {
        // append data to the DOM
        $('.history').empty();
        appendCalculation(response);
    });
}

function appendCalculation(x) {
    
    for (let i = 0; i < x.length; i++) {
        let calculation = x[i];
        $('.history').append(`
            <li>${calculation.first_input}   ${calculation.operator_used}   ${calculation.last_input} =  ${calculation.answer}</li>
                 
            `);
        let ourAnswer = $('.theAnswer');
        ourAnswer.empty();
        $('.theAnswer').text(`Answer: ${calculation.answer}`);

    }
}
