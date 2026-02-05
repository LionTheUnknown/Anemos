interface WeatherIconProps {
  weather_icon: string;
  size?: number;
  alt?: string;
}


export default function WeatherIcon({
  weather_icon,
  size = 256,
  alt = "Weather condition",
}: WeatherIconProps) {
  const src = `/weather_icons/${weather_icon}.png`;

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
    />
  );
}
