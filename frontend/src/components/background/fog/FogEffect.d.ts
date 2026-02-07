interface FogEffectProps {
  backgroundImageUrl?: string;
  type?: 'light' | 'dense';
  fillContainer?: boolean;
}

declare const FogEffect: (props: FogEffectProps) => JSX.Element;
export default FogEffect;
