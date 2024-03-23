export const getPastDates = (days: number): string[] => {
  const today = new Date();
  const dates = [];

  for (let i = 0; i < days; i++) {
    const pastDay = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);

    dates.push(
      pastDay.toLocaleDateString("en-US", { day: "numeric", month: "short" })
    );
  }

  return dates;
};
