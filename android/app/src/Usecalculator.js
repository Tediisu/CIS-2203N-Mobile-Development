import {useReducer, useEffect} from 'react';
import {AppState} from 'react-native';

const STUDENT_ID_SUFFIX = '456';
export const CUSTOM_MULTIPLIER = parseFloat(STUDENT_ID_SUFFIX) / 100; // 4.56


let _persistedState = null;

// ── Initial / default state ──
const DEFAULT_STATE = {
  display: '0',
  operandA: null,
  operator: null,
  waitingForB: false,
  justEvaluated: false,
  history: [],
};

function getInitialState() {
  return _persistedState ?? {...DEFAULT_STATE};
}

// ── Pure evaluate ──
function evaluate(a, op, b) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  switch (op) {
    case '+': return numA + numB;
    case '−': return numA - numB;
    case '×': return numA * numB;
    case '÷':
      if (numB === 0) return 'Cannot divide by zero';
      return numA / numB;
    default: return numA;
  }
}

function formatResult(val) {
  if (typeof val === 'string') return val; // error string
  if (!isFinite(val)) return 'Error';
  return String(parseFloat(val.toPrecision(12)));
}

// ── Reducer ──
function reducer(state, action) {
  switch (action.type) {

    case 'DIGIT': {
      const d = action.payload;
      if (state.justEvaluated) {
        return {
          ...state,
          display: d === '.' ? '0.' : d,
          operandA: null, operator: null,
          waitingForB: false, justEvaluated: false,
        };
      }
      if (state.waitingForB) {
        const next =
          d === '.' && '0'.includes('.') ? '0.' :
          d === '.' ? '0.' :
          d;
        return {...state, display: next, waitingForB: false};
      }
      const cur = state.display;
      if (d === '.' && cur.includes('.')) return state;
      const next = cur === '0' && d !== '.' ? d : cur + d;
      return {...state, display: next};
    }

    case 'OPERATOR': {
      const op = action.payload;
      if (state.operandA !== null && state.operator && !state.waitingForB) {
        const result = evaluate(state.operandA, state.operator, state.display);
        const resultStr = formatResult(result);
        if (resultStr === 'Cannot divide by zero' || resultStr === 'Error') {
          return {
            ...state, display: resultStr,
            operandA: null, operator: null,
            waitingForB: false, justEvaluated: true,
          };
        }
        return {
          ...state, display: resultStr,
          operandA: resultStr, operator: op,
          waitingForB: true, justEvaluated: false,
        };
      }
      return {
        ...state,
        operandA: state.display,
        operator: op,
        waitingForB: true,
        justEvaluated: false,
      };
    }

    case 'EQUALS': {
      if (state.operandA === null || state.operator === null) return state;
      const b = state.waitingForB ? state.operandA : state.display;
      const result = evaluate(state.operandA, state.operator, b);
      const resultStr = formatResult(result);
      const expression = `${state.operandA} ${state.operator} ${b}`;
      const newHistory = [{expression, result: resultStr}, ...state.history].slice(0, 50);
      return {
        ...state,
        display: resultStr,
        operandA: null, operator: null,
        waitingForB: false, justEvaluated: true,
        history: newHistory,
      };
    }

    case 'CUSTOM_OP': {
      const num = parseFloat(state.display);
      if (isNaN(num)) return state;
      const result = num * CUSTOM_MULTIPLIER;
      const resultStr = formatResult(result);
      const expression = `${state.display} × ${CUSTOM_MULTIPLIER}`;
      const newHistory = [{expression, result: resultStr}, ...state.history].slice(0, 50);
      return {
        ...state,
        display: resultStr,
        operandA: null, operator: null,
        waitingForB: false, justEvaluated: true,
        history: newHistory,
      };
    }

    case 'TOGGLE_SIGN': {
      if (state.display === '0' || state.display.startsWith('C') || state.display === 'Error') return state;
      const toggled = state.display.startsWith('-')
        ? state.display.slice(1)
        : '-' + state.display;
      return {...state, display: toggled};
    }

    case 'PERCENT': {
      const num = parseFloat(state.display);
      if (isNaN(num)) return state;
      return {...state, display: formatResult(num / 100)};
    }

    case 'CLEAR_ENTRY': {
      if (state.display.length > 1 && !state.justEvaluated) {
        return {...state, display: state.display.slice(0, -1)};
      }
      return {...state, display: '0'};
    }

    case 'ALL_CLEAR':
      return {...DEFAULT_STATE, history: state.history};

    case 'CLEAR_HISTORY':
      return {...state, history: []};

    default:
      return state;
  }
}

// ── Hook ──
export function useCalculator() {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);

  useEffect(() => {
    _persistedState = state;
  }, [state]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
      }
    });
    return () => sub.remove();
  }, []);

  return {
    display: state.display,
    operator: state.operator,
    operandA: state.operandA,
    history: state.history,
    customLabel: `×${CUSTOM_MULTIPLIER}`,
    dispatch,
  };
}