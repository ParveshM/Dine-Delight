import {
  nameRegex,
  emailRegex,
  addressRegex,
  phoneRegex,
  descriptionRegex,
} from "../constants";
import { FormInitalState } from "./restaurantformUtills";
type SignupValidation = Partial<{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}>;
const validateSignUp = (values: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const { name, email, password, confirmPassword } = values;
  const errors: SignupValidation = {};

  //   Name validate
  if (!name.trim().length) {
    errors.name = "Required*";
  } else if (name.length > 20) {
    errors.name = "Must be 20 characters or less.";
  } else if (!nameRegex.test(name)) {
    errors.name =
      "First letter must be capital and no leading or trailing spaces.";
  }
  //   email validate
  if (!email.trim().length) {
    errors.email = "Required*";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format.";
  }
  // password validate
  if (!password.trim().length) {
    errors.password = "Required*";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    errors.password = "Password must contain uppercase and lowercase letters.";
  } else if (!/\d/.test(password)) {
    errors.password = "Password must contain at least one digit.";
  } else if (!/[@$!%*?&]/.test(password)) {
    errors.password = "Password must contain at least one special character.";
  }

  //   confirmPassword validate
  if (!confirmPassword.trim().length) {
    errors.confirmPassword = "Required*";
  } else if (
    confirmPassword.length !== password.length ||
    confirmPassword !== password
  ) {
    errors.confirmPassword = "Password is not matching";
  }

  return errors;
};

function validateLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const errors: { email?: string; password?: string } = {};
  if (!email.trim().length) {
    errors.email = "Required*";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format.";
  }
  if (!password.trim().length) {
    errors.password = "Password is Required*";
  }
  return errors;
}

const validateResetPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => {
  let errors: { password?: string; confirmPassword?: string } = {};

  if (!password.trim().length) {
    errors.password = "Required*";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    errors.password = "Password must contain uppercase and lowercase letters.";
  } else if (!/\d/.test(password)) {
    errors.password = "Password must contain at least one digit.";
  } else if (!/[@$!%*?&]/.test(password)) {
    errors.password = "Password must contain at least one special character.";
  }

  //   confirmPassword validate
  if (!confirmPassword.trim().length) {
    errors.confirmPassword = "Required*";
  } else if (
    confirmPassword.length !== password.length ||
    confirmPassword !== password
  ) {
    errors.confirmPassword = "Password is not matching";
  }
  return errors;
};

export type ValidateRestaurantType = Partial<{
  restaurantName: string;
  address: string;
  description: string;
  phone: string;
  tableRatePerPerson: string;
  openingTime: string;
  closingTime: string;
  searchLocation: string;
}>;

const validateRestaurantDetails = (formData: FormInitalState) => {
  let errors: ValidateRestaurantType = {};
  const {
    restaurantName,
    address,
    description,
    phone,
    tableRatePerPerson,
    openingTime,
    closingTime,
    searchLocation,
  } = formData;
  console.log(formData);

  // Validate restaurant name
  if (!restaurantName.trim().length) {
    errors.restaurantName = "Restaurant name is required.";
  } else if (!nameRegex.test(restaurantName)) {
    errors.restaurantName =
      "First letter must be capital and no leading or trailing spaces.";
  } else if (restaurantName.trim().length > 25) {
    errors.restaurantName =
      "Restaurant name is must be less than 25 charcters.";
  }

  // Validate address
  if (!address.trim()) {
    errors.address = "Address is required.";
  } else if (!addressRegex.test(address)) {
    errors.address =
      "Please enter a valid address.First letter must be upper case.";
  }

  if (!description.trim().length) {
    errors.description = "Description is required.";
  } else if (description.trim().length > 200) {
    errors.description = "Description must be less than 200 characters.";
  } else if (!descriptionRegex.test(description)) {
    errors.description =
      "Please enter a valid description.First letter must be uppercase";
  }

  // Validate table rate
  if (!tableRatePerPerson) {
    errors.tableRatePerPerson = "Table Rate is required.";
  } else if (isNaN(tableRatePerPerson) || tableRatePerPerson <= 0) {
    errors.tableRatePerPerson = "Please enter a valid table rate.";
  }

  if (!phone.trim().length) {
    errors.phone = "Phone number is required.";
  } else if (!phoneRegex.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!validateTimeRange(openingTime, closingTime)) {
    errors.openingTime = "Opening time must be before closing time";
  }

  if (!searchLocation.trim()) {
    errors.searchLocation = "Location is required.";
  }

  return errors;
};

export {
  validateSignUp,
  validateLogin,
  validateResetPassword,
  validateRestaurantDetails,
};
export function validateTimeRange(
  openingTime: string,
  closingTime: string
): boolean {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return date;
  };

  const openingTimeDate = formatTime(openingTime);
  const closingTimeDate = formatTime(closingTime);

  if (openingTimeDate >= closingTimeDate) {
    return false;
  }

  return true;
}
