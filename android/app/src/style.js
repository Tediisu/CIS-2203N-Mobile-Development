// ─── styles.js ────────────────────────────────────────────────────────────────
// Milestone 1: Custom color theme (dark + light), passed as prop from App.jsx
// ─────────────────────────────────────────────────────────────────────────────

import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
// 4 columns, 12px gap on each side + 3 gaps between buttons
const GRID_PADDING = 16;
const GAP = 10;
const BTN_SIZE = Math.floor((width - GRID_PADDING * 2 - GAP * 3) / 4);

export function makeStyles(dark) {
  const t = dark
    ? {
        bg:          '#0f0f11',
        surface:     '#1a1a1f',
        surface2:    '#222228',
        border:      '#2e2e36',
        text:        '#f0eff8',
        textMuted:   '#6b6a7a',
        accent:      '#b08aff',
        accentDim:   '#3d2e6e',
        opBg:        '#2a2060',
        opText:      '#c9b8ff',
        fnBg:        '#232328',
        fnText:      '#a8a8b8',
        digitBg:     '#1e1e24',
        digitText:   '#f0eff8',
        eqBg:        '#7c5cfc',
        eqText:      '#ffffff',
        error:       '#ff6b6b',
        histBg:      '#15151a',
      }
    : {
        bg:          '#f0eef9',
        surface:     '#ffffff',
        surface2:    '#f5f3ff',
        border:      '#ddd9f0',
        text:        '#1a1830',
        textMuted:   '#9896b0',
        accent:      '#6b3fff',
        accentDim:   '#e4dcff',
        opBg:        '#ede8ff',
        opText:      '#5530d6',
        fnBg:        '#f0eef9',
        fnText:      '#5e5a7a',
        digitBg:     '#ffffff',
        digitText:   '#1a1830',
        eqBg:        '#6b3fff',
        eqText:      '#ffffff',
        error:       '#d93025',
        histBg:      '#f5f3ff',
      };

  return StyleSheet.create({
      shell: {
        flex: 1,
        backgroundColor: t.bg,
        paddingHorizontal: GRID_PADDING,
        paddingBottom: 12,
      },

      // ── Display ──
      display: {
        backgroundColor: t.surface2,
        borderWidth: 1,
        borderColor: t.border,
        borderRadius: 18,
        paddingHorizontal: 18,
        paddingTop: 14,
        paddingBottom: 12,
        marginBottom: 10,
        minHeight: 100,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      },
      displayExpression: {
        fontSize: 13,
        color: t.textMuted,
        fontFamily: 'Courier New',
        marginBottom: 2,
        minHeight: 18,
      },
      displayNumber: {
        fontFamily: 'Courier New',
        color: t.text,
        lineHeight: undefined,
      },
      displayError: {
        color: t.error,
        fontSize: 18,
      },

      // ── Custom operator button (Milestone 3) ──
      customOpRow: {
        marginBottom: 10,
      },
      customOpBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: t.accentDim,
        borderWidth: 1,
        borderColor: t.accent,
        borderStyle: 'dashed',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 14,
        gap: 8,
      },
      customBadge: {
        fontSize: 10,
        fontWeight: '700',
        color: t.eqText,
        backgroundColor: t.accent,
        borderRadius: 4,
        paddingHorizontal: 5,
        paddingVertical: 1,
        overflow: 'hidden',
        letterSpacing: 0.8,
      },
      customOpLabel: {
        fontFamily: 'Courier New',
        fontSize: 14,
        fontWeight: '500',
        color: t.accent,
      },

      // ── Grid ──
      grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: GAP,
      },

      // ── Buttons ──
      btn: {
        width: BTN_SIZE,
        height: BTN_SIZE,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
      },
      btnFn: {
        backgroundColor: t.fnBg,
        borderWidth: 1,
        borderColor: t.border,
      },
      btnDigit: {
        backgroundColor: t.digitBg,
        borderWidth: 1,
        borderColor: t.border,
      },
      btnOp: {
        backgroundColor: t.opBg,
      },
      btnOpActive: {
        backgroundColor: t.accent,
      },
      btnEquals: {
        backgroundColor: t.eqBg,
      },

      btnTextFn: {
        fontSize: 16,
        fontWeight: '600',
        color: t.fnText,
      },
      btnTextDigit: {
        fontSize: 20,
        fontWeight: '600',
        color: t.digitText,
      },
      btnTextOp: {
        fontSize: 22,
        fontWeight: '400',
        color: t.opText,
      },
      btnTextOpActive: {
        color: '#fff',
      },
      btnTextEquals: {
        fontSize: 26,
        fontWeight: '300',
        color: t.eqText,
      },

      // ── History (Bonus) ──
      historySection: {
        flex: 1,
        backgroundColor: t.histBg,
        borderWidth: 1,
        borderColor: t.border,
        borderRadius: 16,
        padding: 12,
        marginTop: 10,
        minHeight: 80,
      },
      historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
      },
      historyTitle: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.2,
        color: t.textMuted,
        textTransform: 'uppercase',
      },
      historyClear: {
        fontSize: 11,
        fontWeight: '700',
        color: t.error,
        letterSpacing: 0.5,
        opacity: 0.8,
      },
      historyEmpty: {
        fontSize: 12,
        color: t.textMuted,
        textAlign: 'center',
        fontStyle: 'italic',
        paddingVertical: 8,
      },
      historyEntry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingVertical: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: t.border,
      },
      historyExpr: {
        fontFamily: 'Courier New',
        fontSize: 12,
        color: t.textMuted,
        flex: 1,
        marginRight: 8,
      },
      historyResult: {
        fontFamily: 'Courier New',
        fontSize: 14,
        fontWeight: '500',
        color: t.accent,
      },
  });
}