export const validateForm = (key: string, value: string, password?: string) => {
  if (key === "username") {
    return value.length > 5;
  } else if (key === "password") {
    return value.length > 8;
  } else if (key === "confirmPassword") {
    return password === value;
  }
};
