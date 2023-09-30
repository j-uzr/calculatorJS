/* 
The first steps to building this calculator are to be able to 
(1) Listen for all keypresses
(2) Determine the type of key that is pressed

In this case, we can use an event delegation pattern to listen, since the keys are all children of .calculator__keys via query selector.
*/

const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

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
        result = parseFloat(num1) / parseFloat(num2)
    } 
}

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
            if(displayedNum === '0'|| previousKeyType === 'operator'){
                display.textContent = keyContent
                calculator.dataset.previousKeyType = keyContent // THIS IS NOT ON THE TUTORIAL
            }
            else{
                display.textContent = displayedNum + keyContent
            }
        }
        if(action === 'add' || action === 'subtract' || action === 'multiply' ||action === 'divide'){
            console.log('operator key!')
            key.classList.add('is-depressed')
            
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
            calculator.dataset.previousKeyType = 'operator'
        }
        if (action === 'decimal' && !displayedNum.includes('.')) {
            console.log('decimal key!')
            display.textContent = displayedNum + '.'
        }
          
        if (action === 'clear') {
            console.log('clear key!')
            display.textContent = '0'
        }
        
        if (action === 'calculate') {
            console.log('equal key!')
            
            const secondValue = displayedNum
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator

            display.textContent = calculate(firtstValue, operator, secondValue)
        }
    }
})