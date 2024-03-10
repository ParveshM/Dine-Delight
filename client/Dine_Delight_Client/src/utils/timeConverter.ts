export const convertTimeFormat = (timeString: string): string => {
  const [timePart, ampmPart] = timeString.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);
  hours = parseInt(hours.toString(), 10);

  if (ampmPart.toUpperCase() === "PM" && hours < 12) {
    hours += 12;
  }
  if (ampmPart.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};
