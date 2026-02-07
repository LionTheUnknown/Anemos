interface SnowEffectProps {
  backgroundImageUrl?: string;
  type?: 'gentle' | 'storm';
  fillContainer?: boolean;
}

declare const SnowEffect: (props: SnowEffectProps) => JSX.Element;
export default SnowEffect;
