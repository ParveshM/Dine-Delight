export function parseTimeSlot(timeString: string) {
  if (!timeString) {
    return "";
  }
  var timeArray = timeString.split(":");
  var hour = parseInt(timeArray[0], 10);
  var min = parseInt(timeArray[1], 10);

  if (timeString.includes("PM") && hour < 12) {
    hour += 12;
  } else if (timeString.includes("AM") && hour === 12) {
    hour = 0;
  }

  var paddedHour = hour.toString().padStart(2, "0");
  var paddedMin = min.toString().padStart(2, "0");

  return paddedHour + ":" + paddedMin;
}
