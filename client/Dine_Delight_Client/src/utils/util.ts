export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const truncate = (str: string) => {
  return str.length > 10 ? str.substring(0, 15) + "..." : str;
};

export const statusTextColor = (status:string):string => {
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
      textColor = "text-greem-500";
      break;
    default:
      textColor = "text-gray-800";
  }

  return textColor;
};
