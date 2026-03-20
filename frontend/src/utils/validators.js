export const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

export const isPasswordValid = (password) => password.trim().length >= 6;

export const isPhoneValid = (phone) => phone.trim().length >= 8;
