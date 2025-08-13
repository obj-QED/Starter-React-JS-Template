export interface Theme {
  [key: string]: any;
  theme_color?: {
    light?: {
      colors?: Record<string, string>;
    };
    dark?: {
      colors?: Record<string, string>;
    };
  };
  spacing?: Record<string, string>;
  breakpoints?: Record<string, string>;
  typography?: Record<string, string>;
  shadows?: Record<string, string>;
  transitions?: Record<string, string>;
  radius?: Record<string, string>;
}
