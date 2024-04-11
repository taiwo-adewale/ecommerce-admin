/**
 * Generates an array of past dates in the format "Mon DD" (e.g., "Apr 13").
 * @param days - The number of past days to generate dates for.
 * @returns An array of past dates.
 */

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
