function between(min, max, typeofnums) {
    var num = Math.floor(Math.random() * (max - min + 1) + min)

    if (typeofnums == "integers") {
        // if both add and subtract are okay, then 
        // if even, return negative number
        if (Math.floor(Math.random() * 2) % 2 == 0) {
            return -num
        }
    }
    return num
}

function generateArrayOfNumbers(digits, nums, typeofnums) {
    var numbers = [];
    var min = 10 ** (digits - 1);
    var max = (10 ** digits) - 1;

    for (var i = 0; i < nums; i++) {
        numbers.push(between(min, max, typeofnums));
    }

    return numbers;
}


function main() {
    // get how many digits user wants
    var digits = document.getElementById("digits").value;

    //get how many numbers user wants
    var nums = document.getElementById("nums").value;

    //get what type of numbers user wants
    var typeofnums = document.getElementById("typeofnums").value;


    // Keep generating numbers till all criteria satisfied
    outer_loop:
    while (true) {
        // create the final array of numbers
        var numArray = generateArrayOfNumbers(digits, nums, typeofnums);

        //get sum of array. but doesn't support breaking to outer label
        // var sum = numArray.reduce((a, b) => a + b)

        var sum = 0; // to checks tha the running total is never <0
        var atLeastOneNegative = false; // to check that there was at least one subtraction if integers was chosen

        // loop over array
        for (let index = 0; index < numArray.length; index++) {
            sum = sum + numArray[index];

            // if running total goes below zero, generate new array of numbers
            if (sum < 0) {
                console.log("Got running total < 0")
                continue outer_loop;
            }

            // if any number is negative, remember that
            if (numArray[index] < 0) {
                atLeastOneNegative = true;
            }
        }

        // if user chose integers but there was no negative number, generate new numbers
        if (typeofnums == "integers") {
            if (!atLeastOneNegative) {
                console.log("No negative number")
                continue;
            }
        }

        // all checks passed, so the array of nums is good for use
        break;
    }

    document.getElementById("criteria").innerHTML = `Generate ${nums} ${digits}-digit numbers of type: ${typeofnums}`;
    document.getElementById("numbers").innerHTML = numArray.join(", <br>");
    document.getElementById("answer").innerHTML = `Sum: ${sum}`;

    // multiply
    if (digits <= 3 && nums <= 3) {
        var product = numArray.reduce((a, b) => a * b);
        document.getElementById("product").innerHTML = `Product: ${product}`;
    } else {
        document.getElementById("product").innerHTML = `Product: Only if <4 digits & <4 numbers`;
    }
}


