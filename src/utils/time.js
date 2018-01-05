export const clearAllTimeouts = () => {
  let id = setTimeout(null,0);
  while (id--) {
    clearTimeout(id);
  }
}

export const getTimestamp = () => {
  const date = new Date();
  return date.getTime();
}

export const toClock = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const milliseconds = (Math.floor((Math.floor(time) - time) * 100) * -1) - 1;
  const adjustedMilliseconds = milliseconds < 0 ? 0 : milliseconds;

  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const paddedMilliseconds = adjustedMilliseconds < 10 ? `0${adjustedMilliseconds}` : adjustedMilliseconds;

  return `${paddedMinutes}:${paddedSeconds}:${paddedMilliseconds}`;
};
