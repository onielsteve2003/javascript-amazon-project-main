import {formatCurrency} from "../utilities/money.js"

if (formatCurrency(2095) === '20.95'){
    console.log('passed')
}
else{
    console.log('failed')
}

// a situation we are testing is called a test case
// a group of related test is a test suite