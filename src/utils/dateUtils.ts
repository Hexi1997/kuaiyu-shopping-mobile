/**
 * 获取指定时间距离当前时间的天数
 * @param time 时间
 */
export const getDaysFromNow = (time: Date) => {
  return Math.abs(Date.now() - new Date(time).getTime()) / 1000 / 24 / 3600;
};
