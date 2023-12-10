/**
 * Format the given date string or Date object into a formatted string with date and time.
 * @param dateString - The date string or Date object to be formatted.
 * @returns The formatted date and time string (e.g., "Feb 1, 2023 4:30 PM").
 */
export const formatDate = (dateString: Date | string): string => {
  const date = new Date(dateString);

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
    date
  );
  const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
    date
  );

  return `${formattedDate} ${formattedTime}`;
};
