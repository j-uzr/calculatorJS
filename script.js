/* 
The first steps to building this calculator are to be able to 
(1) Listen for all keypresses
(2) Determine the type of key that is pressed

In this case, we can use an event delegation pattern to listen, since the keys are all children of .calculator__keys via query selector.
*/

const calculate = (num1, operator, num2) => {
    if(operator === 'add'){
        result = parseFloat(num1) + parseFloat(num2)
    }

    else if(operator === 'subtract'){
        result = parseFloat(num1) - parseFloat(num2)
    }

    else if(operator === 'multiply'){
        result = parseFloat(num1) * parseFloat(num2)
    }

    else if(operator === 'divide'){

        if(num2 == '0'){
            return 'Undefined'
        }

        result = parseFloat(num1) / parseFloat(num2)
    } 
    return result
}

const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

keys.addEventListener('click', e => {
    if(e.target.matches('button')){
        // 'e' is the short var reference for event object which will be passed to event handlers
        const key = e.target 

        // key.dataset.action is accessing the value of the data-action attribute from the key element and storing it in a constant variable named action
        const action = key.dataset.action

        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        Array.from(key.parentNode.children)
            .forEach(operatorKey => operatorKey.classList.remove('is-depressed'))
        
        if(!action){
            console.log('number key!')

            if(displayedNum === '0'|| previousKeyType === 'operator' || previousKeyType === 'calculate'){
                display.textContent = keyContent
            }
            else{
                display.textContent = displayedNum + keyContent
            }
            
            calculator.dataset.previousKeyType = 'number'
        }

        if((action === 'add' || action === 'subtract' || action === 'multiply' ||action === 'divide')){
            console.log('operator key!')

            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            
            // Note: It's sufficient to check for firstValue and operator because secondValue always exists
            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue
                calculator.dataset.firstValue = calcValue
            }
            else{
                calculator.dataset.firstValue = displayedNum
            }
        
            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action
            console.log(calculator.dataset.previousKeyType)
        }

        if (action === 'decimal') {
            console.log('decimal key!')
            if(!displayedNum.includes('.')){
                display.textContent = displayedNum + '.'
            }
            
            if(previousKeyType === 'operator' || previousKeyType === 'calculate'){
                display.textContent = '0.'
            }

            calculator.dataset.previousKeyType = 'decimal'
        }

        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }
          
        if (action === 'clear') {
            console.log('clear key!')

            if(key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            }

            else {
                key.textContent = 'AC'
            }

            display.textContent = '0'
            calculator.dataset.previousKeyType = 'clear'
        }
        
        if (action === 'calculate') {
            console.log('equal key!')

            let  firstValue = calculator.dataset.firstValue
            let secondValue = displayedNum
            const operator = calculator.dataset.operator

            if (firstValue) {
                if(previousKeyType === 'calculate'){
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modifiedValue
                }
                display.textContent = calculate(firstValue, operator, secondValue)
              }
            
            calculator.dataset.modifiedValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }

    }
})