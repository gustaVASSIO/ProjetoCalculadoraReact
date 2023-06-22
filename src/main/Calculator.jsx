import { Component } from "react";
import './Calculator.css'
import Button from "../components/Button/Button";
import Display from "../components/Display/Display";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {
    state = { ...initialState }

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }
    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if(this.state.displayValue === '0')
            return

        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const finish = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            
            try {

                //função eval analisa a expressão aritmética utilizada e retorna um valor numérico
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch {

                values[0] = this.state.values[0]
            }
            values[1] = 0
            this.setState({
                displayValue: values[0],
                operation: finish ? null : operation,
                current: finish ? 0 : 1,
                clearDisplay: !finish,
                values
            })
        }
    }

    addDigit(n) {

        // verifica se ja existe um '.' no display
        if (n === '.' && this.state.displayValue.includes('.'))
            return

        if(this.state.displayValue === '0' && n === '.')
            this.setState({displayValue:'0.'})
        
        if(this.state.displayValue === '0.' && this.state.operation)
            this.setState({displayValue: '0'})

        // verifica os casos que em que são necessários limpar o display
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay

        // pega o valor corrente no display e altera o valor do displayValue no objeto 
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        // adiciona o vlaor digitado na respectiva posição do array 'values'
        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]

            values[i] = newValue
            this.setState({ values })
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label='AC' click={this.clearMemory} triple />
                <Button label='/' click={this.setOperation} operation />
                <Button label='7' click={this.addDigit} />
                <Button label='8' click={this.addDigit} />
                <Button label='9' click={this.addDigit} />
                <Button label='*' click={this.setOperation} operation />
                <Button label='4' click={this.addDigit} />
                <Button label='5' click={this.addDigit} />
                <Button label='6' click={this.addDigit} />
                <Button label='-' click={this.setOperation} operation />
                <Button label='1' click={this.addDigit} />
                <Button label='2' click={this.addDigit} />
                <Button label='3' click={this.addDigit} />
                <Button label='+' click={this.setOperation} operation />
                <Button label='0' click={this.addDigit} double />
                <Button label='.' click={this.addDigit} />
                <Button label='=' click={this.setOperation} operation />
            </div>
        );
    }
}