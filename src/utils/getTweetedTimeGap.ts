const getTweetedTimeGap = (tweetedAt: string) => {
  const oldTime = new Date(tweetedAt);
  const curTime = new Date();

  const elapsedMsec = curTime.getTime() - oldTime.getTime();
  if (elapsedMsec < 1000) {
    return 'now';
  }

  const elapsedSec = Math.floor(elapsedMsec / 1000);
  if (elapsedMsec < 60) {
    return `${elapsedSec}s`;
  }

  const elapsedMin = Math.floor(elapsedSec / 60);
  if (elapsedMin < 60) {
    return `${elapsedMin}m`;
  }

  const elapsedHour = Math.floor(elapsedMin / 60);
  if (elapsedHour < 24) {
    return `${elapsedHour}h`;
  }

  const elapsedDay = Math.floor(elapsedHour / 24);
  if (elapsedDay < 365) {
    return `${oldTime.getMonth()}m ${oldTime.getDate()}d`;
  }

  return `${oldTime.getFullYear()}y ${oldTime.getMonth()}m ${oldTime.getDate()}d`;
};

export default getTweetedTimeGap;
