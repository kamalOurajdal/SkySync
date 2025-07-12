import React from "react";
import { formatToLocalTime, getIcon } from "../services/WeatherServices";
import {
  MapPin,
  Clock,
  Thermometer,
  Wind,
  Droplets,
  Eye,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const WeatherBriefCard = ({ currentWeather, isLoading = false }) => {
  const { isDark } = useTheme();

  /* ───────────── skeleton  ───────────── */
  if (isLoading) {
    return (
        <div className="bg-gradient-to-br from-light-primary via-light-secondary to-purple-600 dark:from-dark-primary dark:via-dark-secondary dark:to-purple-600 text-white rounded-3xl p-8 mb-6 animate-pulse transition-all duration-300">
          <div className="flex sm:block items-center justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="h-14 bg-white/20 rounded-2xl w-48" />
              <div className="h-6 bg-white/20 rounded-lg w-40" />
              <div className="h-8 bg-white/20 rounded-lg w-64" />
            </div>
            <div className="w-24 h-24 bg-white/20 rounded-full sm:mx-auto" />
          </div>
        </div>
    );
  }
  if (!currentWeather) return null;

  /* ───────────── data prep  ───────────── */
  const {
    feels_like,
    temp_min,
    temp_max,
    name,
    dt,
    country,
    main,
    icon,
    temp,
    timezone,
    humidity,
    wind_speed,
    visibility,
    pressure,
  } = currentWeather;

  const [localeDate, localeTime] = formatToLocalTime(
      Number(dt),
      Number(timezone) / 60
  ).split("|");

  const metrics = [
    { icon: Droplets, label: "Humidity", value: humidity && `${humidity}%` },
    {
      icon: Wind,
      label: "Wind",
      value: wind_speed && `${Math.round(wind_speed)} km/h`,
    },
    {
      icon: Eye,
      label: "Visibility",
      value: visibility && `${Math.round(visibility / 1000)} km`,
    },
    {
      icon: Thermometer,
      label: "Pressure",
      value: pressure && `${pressure} hPa`,
    },
  ].filter((m) => m.value);

  /* ─────────────  UI  ───────────── */
  return (
      <div className="relative bg-gradient-to-br from-light-primary via-light-secondary to-purple-600 dark:from-dark-primary dark:via-dark-secondary dark:to-purple-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl mb-6 overflow-hidden transition-all duration-300 ease-in-out animate-scale-in">
        {/* soft background blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl transition-all duration-300" />
        <div className="absolute bottom-0 -left-16 w-56 h-56 bg-purple-400/20 rounded-full blur-2xl transition-all duration-300" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* icon for phones goes first */}
          <div className="sm:hidden self-center">
            <img
                src={getIcon(icon)}
                alt={main}
                className="h-24 drop-shadow-xl transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* temperature & condition */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-baseline gap-1 mb-1">
            <span className="text-6xl font-extrabold leading-none">
              {Math.round(temp)}
            </span>
              <span className="text-2xl font-light">°C</span>
            </div>
            <span className="capitalize text-lg font-medium opacity-90 mb-2">
            {main}
          </span>

            {/* location pill */}
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/30">
              <MapPin className="w-4 h-4 text-red-200" />
              {name}, {country}
            </div>

            {/* min / max / feels like */}
            <div className="mt-3 flex gap-3 text-sm opacity-90">
            <span className="flex items-center gap-0.5">
              <span className="text-red-200">↑</span>
              {Math.round(temp_max)}°
            </span>
              <span className="flex items-center gap-0.5">
              <span className="text-blue-200">↓</span>
                {Math.round(temp_min)}°
            </span>
              <span className="hidden xs:inline">
              Feels&nbsp;{Math.round(feels_like)}°
            </span>
            </div>
          </div>

          {/* center icon for tablets/desktop */}
          <div className="hidden sm:block">
            <img
                src={getIcon(icon)}
                alt={main}
                className="h-32 drop-shadow-xl hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* local time */}
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center sm:justify-start text-xs mb-1 opacity-80">
              <Clock className="w-4 h-4" />
              Local&nbsp;Time
            </div>
            <div className="text-3xl font-light leading-none">{localeTime}</div>
            <div className="text-sm opacity-90">{localeDate}</div>
          </div>
        </div>

        {/* metrics grid – collapses to 2 cols on phones */}
        {metrics.length > 0 && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {metrics.map((m, i) => (
                  <div
                      key={i}
                      className="flex flex-col items-center bg-white/15 backdrop-blur-sm rounded-2xl py-3 transition-all duration-300 hover:bg-white/25 hover:scale-105"
                  >
                    <m.icon className="w-5 h-5 mb-1 opacity-90" />
                    <span className="text-xs opacity-80">{m.label}</span>
                    <span className="text-sm font-semibold">{m.value}</span>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default WeatherBriefCard;
