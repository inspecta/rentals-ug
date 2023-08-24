const calculateTimeDifference = (timestamp) => {
  const currentDate = new Date();
  const timestampDate = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  const timeDifferenceMs = currentDate - timestampDate;

  const seconds = Math.floor(timeDifferenceMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days < 1) {
    // Less than 24 hours, show time in hours and minutes
    return `${hours} hours, ${minutes % 60} minutes ago`;
  } if (days < 7) {
    return days === 1 ? `${days} days ago` : `${days} days ago`;
  } if (days < 365) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? `${weeks} week ago` : `${weeks} weeks ago`;
  }

  const years = Math.floor(days / 365);
  return years === 1 ? `${years} year ago` : `${years} years ago`;
};

export default calculateTimeDifference;
