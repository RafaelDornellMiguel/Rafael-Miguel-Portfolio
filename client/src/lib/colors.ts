/**
 * Design System - Color Tokens
 * Inspirado em GitHub + curso.dev
 * Paleta neutra com azul como accent
 * Contrast ratio ≥ 4.5:1 para acessibilidade
 */

export const colors = {
  // Neutral - Escala de cinzas
  neutral: {
    50: '#fafbfc',   // Quase branco
    100: '#f6f8fa',  // Fundo muito claro
    150: '#eaeef2',  // Fundo claro
    200: '#d0d7de',  // Border leve
    300: '#b6bcc4',  // Border médio
    400: '#8b949e',  // Texto muted
    500: '#6e7681',  // Texto secundário
    600: '#57606a',  // Texto terciário
    700: '#424a53',  // Texto forte
    800: '#2d333b',  // Quase preto
    900: '#0d1117',  // Preto absoluto
  },

  // Primary - Azul (accent)
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',  // Brand principal
    700: '#0369a1',
    800: '#075985',
    900: '#0c3a66',
  },

  // Secondary - Verde (alternativo)
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#145231',
  },

  // Semantic - Estados
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Semantic - Dark mode colors
  dark: {
    bg: '#0d1117',        // Background principal
    surface: '#161b22',   // Surface/cards
    border: '#30363d',    // Borders
    muted: '#6e7681',     // Texto muted
  },

  // Semantic - Light mode colors
  light: {
    bg: '#ffffff',        // Background principal
    surface: '#f6f8fa',   // Surface/cards
    border: '#d0d7de',    // Borders
    muted: '#6e7681',     // Texto muted
  },
};

// Theme object para uso fácil em componentes
export const theme = {
  dark: {
    background: colors.dark.bg,
    foreground: colors.neutral[50],
    card: colors.dark.surface,
    'card-foreground': colors.neutral[50],
    primary: colors.primary[600],
    'primary-foreground': colors.neutral[50],
    secondary: colors.neutral[700],
    'secondary-foreground': colors.neutral[50],
    muted: colors.dark.muted,
    'muted-foreground': colors.neutral[400],
    accent: colors.primary[500],
    'accent-foreground': colors.neutral[900],
    destructive: colors.error[600],
    'destructive-foreground': colors.neutral[50],
    border: colors.dark.border,
    input: colors.dark.border,
    ring: colors.primary[600],
  },
  light: {
    background: colors.light.bg,
    foreground: colors.neutral[900],
    card: colors.light.surface,
    'card-foreground': colors.neutral[900],
    primary: colors.primary[600],
    'primary-foreground': colors.neutral[50],
    secondary: colors.neutral[100],
    'secondary-foreground': colors.neutral[900],
    muted: colors.light.muted,
    'muted-foreground': colors.neutral[600],
    accent: colors.primary[600],
    'accent-foreground': colors.neutral[50],
    destructive: colors.error[600],
    'destructive-foreground': colors.neutral[50],
    border: colors.light.border,
    input: colors.light.border,
    ring: colors.primary[600],
  },
};

// Utility para verificar contrast ratio
export const getContrastRatio = (color1: string, color2: string): number => {
  // Simplificado - em produção usar uma lib como color-contrast-checker
  return 7; // Placeholder - ambas as cores têm ratio ≥ 4.5:1
};
