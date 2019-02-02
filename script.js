// NOTE: 
// This is the starter file for a blog post "How to build a calculator". You can follow the lesson at https://zellwk.com/blog/calculator-part-1

// # START EDITING YOUR JAVASCRIPT HERE
// ===============

// ============================
// Find out what key was pressed
// ============================
const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {

        // pressed key    
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        // current display
        const displayedNum = display.textContent

        // If number key is pressed, and display is 0, replace display with clicked key
        if (!action) {
            if (
                displayedNum === '0' ||
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                display.textContent = keyContent
            }
            // If non zero number, append clicked key to displayed number
            else {
                display.textContent = displayedNum + keyContent
            }
            calculator.dataset.previousKeyType = 'number'
        }

        // Remove .is-depressed class from all keys
        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))

        if (action === 'decimal') {
            
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
            } else if (
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'
            
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            if (
                firstValue &&
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
            ) {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue
            
                calculator.dataset.firstValue = calcValue
            } else {
                calculator.dataset.firstValue = displayedNum
            }
        
            // Add custom attribute
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action
            
            console.log('operator key!')
            key.classList.add('is-depressed')
        }
        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }


        if (action === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValye = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            } else {
                key.textContent = 'AC'
            }
            
            display.textContent = '0'            
            calculator.dataset.previousKeyType = 'clear'

        }
        if (action === 'calculate') {
            console.log('equal key!')
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }
                display.textContent = calculate(firstValue, operator, secondValue)
            }
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'

        }
    }
})

// Define calculate function
const calculate = (n1, operator, n2) => {

    n1 = parseFloat(n1)
    n2 = parseFloat(n2)

    if (operator === 'add') {
        return n1 + n2
    }
    if (operator === 'subtract') {
        return n1 - n2
    }
    if (operator === 'multiply') {
        return n1 * n2
    }
    if (operator === 'divide') {
        return n1 / n2
    }
}
