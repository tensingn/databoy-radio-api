export const getToday = (): Date => {
  return new Date(Date.now());
};

export const getTodayNoTime = (): Date => {
  let today = getToday();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
};

export const getDateDaysInFuture = (numDaysInFuture: number): Date => {
  return new Date(Date.now() + numDaysInFuture * 24 * 60 * 60 * 1000);
};

export const getDateDaysInFutureNoTime = (numDaysInFuture: number): Date => {
  let date = getDateDaysInFuture(numDaysInFuture);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const getDateBeginningOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

export const getDateEndOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setUTCHours(23, 59, 59, 999);
  return d;
};

export const isDateValid = (date: Date): boolean => {
  return !isNaN(date.getTime());
};
