interface RainEffectProps {
  backgroundImageUrl?: string;
  type?: 'rain' | 'storm' | 'drizzle' | 'fallout';
  fillContainer?: boolean;
}

declare const RainEffect: (props: RainEffectProps) => JSX.Element;
export default RainEffect;
