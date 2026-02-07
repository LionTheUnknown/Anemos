/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module './components/background/fog/FogEffect' {
  interface FogEffectProps {
    backgroundImageUrl: string;
    type?: 'light' | 'dense';
  }
  const FogEffect: (props: FogEffectProps) => JSX.Element;
  export default FogEffect;
}

