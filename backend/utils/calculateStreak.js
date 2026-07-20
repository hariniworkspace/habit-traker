const calculateStreak = (logs) => {
  const completedDates = logs
    .filter((log) => log.completed)
    .map((log) => log.date)
    .sort();

  if (!completedDates.length) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalCompleted: 0,
    };
  }

  let longestStreak = 1;
  let currentRun = 1;

  for (let i = 1; i < completedDates.length; i++) {
    const prev = new Date(completedDates[i - 1]);
    const curr = new Date(completedDates[i]);

    const diff =
      (curr - prev) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      currentRun++;
      longestStreak = Math.max(
        longestStreak,
        currentRun
      );
    } else {
      currentRun = 1;
    }
  }

  let currentStreak = 1;

  for (
    let i = completedDates.length - 1;
    i > 0;
    i--
  ) {
    const curr = new Date(completedDates[i]);
    const prev = new Date(completedDates[i - 1]);

    const diff =
      (curr - prev) / (1000 * 60 * 60 * 24);

    if (diff === 1) currentStreak++;
    else break;
  }

  return {
    currentStreak,
    longestStreak,
    totalCompleted: completedDates.length,
  };
};

export default calculateStreak;