interface Window {
  theme?: {
    themeValue: string;
    setPreference: () => void;
    reflectPreference: () => void;
    getTheme: () => string;
    setTheme: (val: string) => void;
  };
}

declare module "plotly.js-dist-min" {
  const Plotly: any;
  export default Plotly;
}
