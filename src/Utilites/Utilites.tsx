
import { addMinutes, format, intervalToDuration } from 'date-fns';


export const getDepartureTime = (time: string, duration: number) => {
  const date = new Date(time);
  const originTime = format(date, 'HH:mm');
  const originTimeAndDuration = addMinutes(date, duration);
  const durationTime = format(originTimeAndDuration, 'HH:mm');
  return `${originTime} - ${durationTime}`;
};

export const getConvertMinutesToTime = (minutes: number) => {
  const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 });
  return `${duration.hours}ч ${duration.minutes === undefined ? '00' : duration.minutes}м`;
};


