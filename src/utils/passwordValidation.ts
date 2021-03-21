export const isWeakPassword = (password: string): boolean => [
  password.match(/[a-z]/) != null,
  password.match(/[A-Z]/) != null,
  password.match(/[!@#$%^&*~]/) != null,
  password.match(/[0-9]/) != null,
].includes(false);
