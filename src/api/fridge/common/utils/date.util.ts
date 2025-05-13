export const generateYMD = (day: number = 0): Date => {
  const now = new Date();
  const ymd = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return new Date(ymd.getTime() + day * 86400000);
};
