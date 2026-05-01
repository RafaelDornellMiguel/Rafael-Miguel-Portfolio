/**
 * Design System - Typography Scale
 * Inspirado em GitHub + curso.dev
 * Hierarquia clara, legibilidade máxima
 */

export const typography = {
  // Display sizes - Headlines grandes
  display: {
    lg: {
      size: 'text-5xl',    // 48px desktop / 36px mobile
      lineHeight: 'leading-tight',
      weight: 'font-bold',
    },
    md: {
      size: 'text-4xl',    // 36px desktop / 28px mobile
      lineHeight: 'leading-tight',
      weight: 'font-bold',
    },
    sm: {
      size: 'text-3xl',    // 30px desktop / 24px mobile
      lineHeight: 'leading-tight',
      weight: 'font-bold',
    },
  },

  // Heading sizes
  heading: {
    h1: {
      size: 'text-4xl',
      lineHeight: 'leading-tight',
      weight: 'font-bold',
    },
    h2: {
      size: 'text-3xl',
      lineHeight: 'leading-tight',
      weight: 'font-bold',
    },
    h3: {
      size: 'text-2xl',
      lineHeight: 'leading-snug',
      weight: 'font-semibold',
    },
    h4: {
      size: 'text-xl',
      lineHeight: 'leading-snug',
      weight: 'font-semibold',
    },
    h5: {
      size: 'text-lg',
      lineHeight: 'leading-normal',
      weight: 'font-semibold',
    },
    h6: {
      size: 'text-base',
      lineHeight: 'leading-normal',
      weight: 'font-semibold',
    },
  },

  // Body sizes
  body: {
    lg: {
      size: 'text-lg',      // 18px
      lineHeight: 'leading-relaxed',
      weight: 'font-normal',
    },
    md: {
      size: 'text-base',    // 16px
      lineHeight: 'leading-relaxed',
      weight: 'font-normal',
    },
    sm: {
      size: 'text-sm',      // 14px
      lineHeight: 'leading-relaxed',
      weight: 'font-normal',
    },
    xs: {
      size: 'text-xs',      // 12px
      lineHeight: 'leading-normal',
      weight: 'font-normal',
    },
  },

  // Label/small text
  label: {
    md: {
      size: 'text-sm',
      lineHeight: 'leading-normal',
      weight: 'font-semibold',
    },
    sm: {
      size: 'text-xs',
      lineHeight: 'leading-normal',
      weight: 'font-semibold',
    },
  },

  // Code/mono
  code: {
    size: 'text-sm',
    lineHeight: 'leading-relaxed',
    weight: 'font-mono',
  },
};

// Font stack padrão
export const fontStacks = {
  sans: 'font-sans', // Deve ser Poppins via index.html
  mono: 'font-mono',
};
