/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_STYLED_COMPONENTS: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.js' {
  const content: any;
  export default content;
}

declare module './plugins/styled-components-check.js' {
  const plugin: () => any;
  export default plugin;
}
