export interface FormatTime {
  min: number;
  secs: number;
}

export const formatTime = (milliseconds): FormatTime => {
  const min = Math.floor(milliseconds / 60000);
  const secs = Math.floor((milliseconds / 1000) % 60);
  return { min, secs };
};
