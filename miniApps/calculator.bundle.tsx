// Calculator Mini-App Bundle
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    if (previousValue !== null && operation) {
      const inputValue = parseFloat(display);
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const Button = ({ onPress, text, style, textStyle }: any) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.7}>
      <Text style={[styles.buttonText, style === styles.operatorButton && styles.operatorButtonText, textStyle]}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🧮 Calculator</Text>
        <Text style={styles.headerSubtitle}>Perform calculations</Text>
      </View>
      <View style={styles.displayContainer}>
        <Text style={styles.display} numberOfLines={1}>
          {display}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <Button onPress={clear} text="C" style={styles.functionButton} textStyle={styles.functionText} />
          <Button onPress={() => inputOperation('÷')} text="÷" style={styles.operatorButton} />
          <Button onPress={() => inputOperation('×')} text="×" style={styles.operatorButton} />
          <Button onPress={() => inputOperation('-')} text="−" style={styles.operatorButton} />
        </View>
        <View style={styles.row}>
          <Button onPress={() => inputNumber('7')} text="7" />
          <Button onPress={() => inputNumber('8')} text="8" />
          <Button onPress={() => inputNumber('9')} text="9" />
          <Button onPress={() => inputOperation('+')} text="+" style={styles.operatorButton} />
        </View>
        <View style={styles.row}>
          <Button onPress={() => inputNumber('4')} text="4" />
          <Button onPress={() => inputNumber('5')} text="5" />
          <Button onPress={() => inputNumber('6')} text="6" />
          <Button
            onPress={performCalculation}
            text="="
            style={styles.equalsButton}
            textStyle={styles.equalsText}
          />
        </View>
        <View style={styles.row}>
          <Button onPress={() => inputNumber('1')} text="1" />
          <Button onPress={() => inputNumber('2')} text="2" />
          <Button onPress={() => inputNumber('3')} text="3" />
          <Button onPress={inputDecimal} text="." style={styles.operatorButton} />
        </View>
        <View style={styles.row}>
          <Button onPress={() => inputNumber('0')} text="0" style={styles.zeroButton} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    paddingTop: 28,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
    color: '#212529',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6c757d',
    fontWeight: '500',
  },
  displayContainer: {
    backgroundColor: '#1a1a1a',
    padding: 28,
    alignItems: 'flex-end',
    minHeight: 140,
    justifyContent: 'center',
  },
  display: {
    fontSize: 56,
    color: '#fff',
    fontWeight: '300',
    fontVariant: ['tabular-nums'],
    letterSpacing: -1,
  },
  buttonContainer: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f8f9fa',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 84,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  buttonText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#212529',
  },
  functionButton: {
    backgroundColor: '#f8f9fa',
    borderColor: '#e9ecef',
  },
  functionText: {
    color: '#ff6b6b',
    fontWeight: '800',
  },
  operatorButton: {
    backgroundColor: '#4a90e2',
    borderColor: '#4a90e2',
  },
  operatorButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  equalsButton: {
    backgroundColor: '#50c878',
    borderColor: '#50c878',
  },
  equalsText: {
    color: '#fff',
    fontWeight: '800',
  },
  zeroButton: {
    flex: 2.1,
  },
});

export default CalculatorApp;

