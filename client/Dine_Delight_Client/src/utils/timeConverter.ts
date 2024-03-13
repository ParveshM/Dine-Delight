export const convertTimeFormat = (
  timeString: string | undefined
): string | null => {
  if (!timeString) return null;
  let [hour, min] = timeString.split(":").map((str) => parseInt(str, 10));
  const paddedHour = hour.toString().padStart(2, "0");
  const paddedMin = min.toString().padStart(2, "0");

  if (hour < 12) return `${paddedHour}:${paddedMin} AM`;
  return `${hour % 12 || 12}:${paddedMin} PM`;
};
