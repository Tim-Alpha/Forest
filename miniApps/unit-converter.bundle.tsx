// Unit Converter Mini-App Bundle
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type UnitType = 'length' | 'weight' | 'temperature';

interface Unit {
  label: string;
  value: string;
  toBase: (val: number) => number;
  fromBase: (val: number) => number;
}

const units: Record<UnitType, { from: Unit[]; to: Unit[] }> = {
  length: {
    from: [
      { label: 'Meters', value: 'm', toBase: (v) => v, fromBase: (v) => v },
      { label: 'Kilometers', value: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { label: 'Centimeters', value: 'cm', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { label: 'Miles', value: 'mi', toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
      { label: 'Feet', value: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { label: 'Inches', value: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ],
    to: [
      { label: 'Meters', value: 'm', toBase: (v) => v, fromBase: (v) => v },
      { label: 'Kilometers', value: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { label: 'Centimeters', value: 'cm', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { label: 'Miles', value: 'mi', toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
      { label: 'Feet', value: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { label: 'Inches', value: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ],
  },
  weight: {
    from: [
      { label: 'Kilograms', value: 'kg', toBase: (v) => v, fromBase: (v) => v },
      { label: 'Grams', value: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { label: 'Pounds', value: 'lb', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      { label: 'Ounces', value: 'oz', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
      { label: 'Tons', value: 't', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    ],
    to: [
      { label: 'Kilograms', value: 'kg', toBase: (v) => v, fromBase: (v) => v },
      { label: 'Grams', value: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { label: 'Pounds', value: 'lb', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      { label: 'Ounces', value: 'oz', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
      { label: 'Tons', value: 't', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    ],
  },
  temperature: {
    from: [
      { label: 'Celsius', value: '°C', toBase: (v) => v, fromBase: (v) => v },
      { label: 'Fahrenheit', value: '°F', toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
      { label: 'Kelvin', value: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
    to: [
      { label: 'Celsius', value: '°C', toBase: (v) => v, fromBase: (v) => v },
      { label: 'Fahrenheit', value: '°F', toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
      { label: 'Kelvin', value: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
};

export function UnitConverterApp() {
  const [unitType, setUnitType] = useState<UnitType>('length');
  const [fromUnit, setFromUnit] = useState(units[unitType].from[0].value);
  const [toUnit, setToUnit] = useState(units[unitType].to[1].value);
  const [inputValue, setInputValue] = useState('');

  const convert = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) return '';

    const fromUnitObj = units[unitType].from.find((u) => u.value === fromUnit);
    const toUnitObj = units[unitType].to.find((u) => u.value === toUnit);

    if (!fromUnitObj || !toUnitObj) return '';

    // Convert to base unit, then to target unit
    const baseValue = fromUnitObj.toBase(numValue);
    const result = toUnitObj.fromBase(baseValue);

    return result.toFixed(6).replace(/\.?0+$/, '');
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const currentUnits = units[unitType];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔄 Unit Converter</Text>
        <Text style={styles.headerSubtitle}>Convert between different units</Text>
      </View>
      <View style={styles.typeSelector}>
        <TouchableOpacity
          style={[styles.typeButton, unitType === 'length' && styles.typeButtonActive]}
          onPress={() => {
            setUnitType('length');
            setFromUnit(units.length.from[0].value);
            setToUnit(units.length.to[1].value);
            setInputValue('');
          }}
        >
          <Text style={[styles.typeButtonText, unitType === 'length' && styles.typeButtonTextActive]}>
            Length
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, unitType === 'weight' && styles.typeButtonActive]}
          onPress={() => {
            setUnitType('weight');
            setFromUnit(units.weight.from[0].value);
            setToUnit(units.weight.to[1].value);
            setInputValue('');
          }}
        >
          <Text style={[styles.typeButtonText, unitType === 'weight' && styles.typeButtonTextActive]}>
            Weight
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, unitType === 'temperature' && styles.typeButtonActive]}
          onPress={() => {
            setUnitType('temperature');
            setFromUnit(units.temperature.from[0].value);
            setToUnit(units.temperature.to[1].value);
            setInputValue('');
          }}
        >
          <Text
            style={[styles.typeButtonText, unitType === 'temperature' && styles.typeButtonTextActive]}
          >
            Temp
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.converterContainer}>
        <View style={styles.inputSection}>
          <Text style={styles.sectionLabel}>From</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.valueInput}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="0"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.unitPicker}
              contentContainerStyle={styles.unitPickerContent}
            >
              {currentUnits.from.map((unit) => (
                <TouchableOpacity
                  key={unit.value}
                  style={[styles.unitOption, fromUnit === unit.value && styles.unitOptionActive]}
                  onPress={() => setFromUnit(unit.value)}
                >
                  <Text
                    style={[
                      styles.unitOptionText,
                      fromUnit === unit.value && styles.unitOptionTextActive,
                    ]}
                  >
                    {unit.value}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        <TouchableOpacity style={styles.swapButton} onPress={swapUnits} activeOpacity={0.7}>
          <Text style={styles.swapButtonText}>⇅ Swap</Text>
        </TouchableOpacity>
        <View style={styles.outputSection}>
          <Text style={styles.sectionLabel}>To</Text>
          <View style={styles.inputRow}>
            <View style={styles.resultDisplay}>
              <Text style={styles.resultText}>{inputValue ? convert() : '0'}</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.unitPicker}
              contentContainerStyle={styles.unitPickerContent}
            >
              {currentUnits.to.map((unit) => (
                <TouchableOpacity
                  key={unit.value}
                  style={[styles.unitOption, toUnit === unit.value && styles.unitOptionActive]}
                  onPress={() => setToUnit(unit.value)}
                >
                  <Text
                    style={[
                      styles.unitOptionText,
                      toUnit === unit.value && styles.unitOptionTextActive,
                    ]}
                  >
                    {unit.value}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  typeSelector: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#4a90e2',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  converterContainer: {
    flex: 1,
    padding: 20,
  },
  inputSection: {
    marginBottom: 24,
  },
  outputSection: {
    marginTop: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  valueInput: {
    flex: 1,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: '600',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  resultDisplay: {
    flex: 1,
    height: 60,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  resultText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  unitPicker: {
    maxHeight: 60,
  },
  unitPickerContent: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 8,
  },
  unitOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    minWidth: 50,
    alignItems: 'center',
  },
  unitOptionActive: {
    backgroundColor: '#4a90e2',
  },
  unitOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  unitOptionTextActive: {
    color: '#fff',
  },
  swapButton: {
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#4a90e2',
    borderRadius: 12,
    marginVertical: 16,
  },
  swapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default UnitConverterApp;

