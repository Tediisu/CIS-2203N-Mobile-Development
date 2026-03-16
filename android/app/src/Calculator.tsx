import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {useCalculator, CUSTOM_MULTIPLIER} from './Usecalculator';
import {makeStyles} from './style';

const BUTTONS = [
  {label: 'AC',  kind: 'fn',     action: {type: 'ALL_CLEAR'}},
  {label: '+/−', kind: 'fn',     action: {type: 'TOGGLE_SIGN'}},
  {label: '%',   kind: 'fn',     action: {type: 'PERCENT'}},
  {label: '÷',   kind: 'op',     action: {type: 'OPERATOR', payload: '÷'}},

  {label: '7',   kind: 'digit',  action: {type: 'DIGIT', payload: '7'}},
  {label: '8',   kind: 'digit',  action: {type: 'DIGIT', payload: '8'}},
  {label: '9',   kind: 'digit',  action: {type: 'DIGIT', payload: '9'}},
  {label: '×',   kind: 'op',     action: {type: 'OPERATOR', payload: '×'}},

  {label: '4',   kind: 'digit',  action: {type: 'DIGIT', payload: '4'}},
  {label: '5',   kind: 'digit',  action: {type: 'DIGIT', payload: '5'}},
  {label: '6',   kind: 'digit',  action: {type: 'DIGIT', payload: '6'}},
  {label: '−',   kind: 'op',     action: {type: 'OPERATOR', payload: '−'}},

  {label: '1',   kind: 'digit',  action: {type: 'DIGIT', payload: '1'}},
  {label: '2',   kind: 'digit',  action: {type: 'DIGIT', payload: '2'}},
  {label: '3',   kind: 'digit',  action: {type: 'DIGIT', payload: '3'}},
  {label: '+',   kind: 'op',     action: {type: 'OPERATOR', payload: '+'}},

  {label: '⌫',   kind: 'fn',     action: {type: 'CLEAR_ENTRY'}},
  {label: '0',   kind: 'digit',  action: {type: 'DIGIT', payload: '0'}},
  {label: '.',   kind: 'digit',  action: {type: 'DIGIT', payload: '.'}},
  {label: '=',   kind: 'equals', action: {type: 'EQUALS'}},
];

export default function Calculator({dark}: {dark: boolean}) {
  const {display, operator, operandA, history, dispatch} = useCalculator();
  const styles = makeStyles(dark);
  const historyRef = useRef<ScrollView>(null);

  const isError = display === 'Cannot divide by zero' || display === 'Error';
  const fontSize =
    display.length > 14 ? 18 :
    display.length > 10 ? 24 : 36;

  return (
    <View style={styles.shell}>

      <View style={styles.display}>
        <Text style={styles.displayExpression} numberOfLines={1}>
          {operandA !== null ? `${operandA} ${operator ?? ''}` : ''}
        </Text>
        <Text
          style={[
            styles.displayNumber,
            {fontSize},
            isError && styles.displayError,
          ]}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.5}>
          {display}
        </Text>
      </View>

      <View style={styles.customOpRow}>
        <TouchableOpacity
          style={styles.customOpBtn}
          onPress={() => dispatch({type: 'CUSTOM_OP'})}
          activeOpacity={0.75}>
          <Text style={styles.customBadge}>CUSTOM</Text>
          <Text style={styles.customOpLabel}>
            × {CUSTOM_MULTIPLIER} (ID suffix: 456)
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {BUTTONS.map(btn => {
          const isActiveOp = btn.kind === 'op' && operator === btn.action.payload;

          const btnStyle = [
            styles.btn,
            btn.kind === 'fn'     && styles.btnFn,
            btn.kind === 'digit'  && styles.btnDigit,
            btn.kind === 'op'     && (isActiveOp ? styles.btnOpActive : styles.btnOp),
            btn.kind === 'equals' && styles.btnEquals,
          ];

          const textStyle = [
            btn.kind === 'fn'     && styles.btnTextFn,
            btn.kind === 'digit'  && styles.btnTextDigit,
            btn.kind === 'op'     && (isActiveOp ? styles.btnTextOpActive : styles.btnTextOp),
            btn.kind === 'equals' && styles.btnTextEquals,
          ];

          return (
            <Pressable
              key={btn.label}
              style={({pressed}) => [
                ...btnStyle,
                pressed && {opacity: 0.7, transform: [{scale: 0.94}]},
              ]}
              onPress={() => dispatch(btn.action)}>
              <Text style={textStyle}>{btn.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.historySection}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>History</Text>
          {history.length > 0 && (
            <TouchableOpacity onPress={() => dispatch({type: 'CLEAR_HISTORY'})}>
              <Text style={styles.historyClear}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          ref={historyRef}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {history.length === 0 ? (
            <Text style={styles.historyEmpty}>No calculations yet</Text>
          ) : (
            history.map((entry: {expression: string; result: string}, i: number) => (
              <View key={i} style={styles.historyEntry}>
                <Text style={styles.historyExpr} numberOfLines={1}>
                  {entry.expression} =
                </Text>
                <Text style={styles.historyResult}>{entry.result}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}