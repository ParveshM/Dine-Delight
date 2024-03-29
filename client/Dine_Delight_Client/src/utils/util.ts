export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const truncate = (str: string) => {
  return str.length > 10 ? str.substring(0, 15) + "..." : str;
};

export const statusTextColor = (status: string): string => {
  let textColor = "";

  switch (status) {
    case "Pending":
      textColor = "text-yellow-500";
      break;
    case "Confirmed":
      textColor = "text-green-500";
      break;
    case "Cancelled":
      textColor = "text-red-500";
      break;
    case "Checked-in":
      textColor = "text-blue-500";
      break;
    case "No-show":
      textColor = "text-gray-500";
      break;
    case "Completed":
      textColor = "text-indigo-500";
      break;
    default:
      textColor = "text-gray-800";
  }

  return textColor;
};

export function timeAgo(input: Date) {
  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat("en");
  const ranges: Record<any, any> = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges[key as keyof typeof ranges] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key as keyof typeof ranges];
      return formatter.format(
        Math.round(delta),
        key as Intl.RelativeTimeFormatUnit
      );
    }
  }
}

export function calculateTotalAmount(
  capacity: number = 0,
  tableRatePerPerson: number = 0
): number {
  const totalAmount = (
    (18 / 100) * capacity * tableRatePerPerson +
    capacity * tableRatePerPerson
  ).toFixed(2);

  return parseInt(totalAmount);
}
