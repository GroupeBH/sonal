export const validatePhoneNumber = (phoneNumber: string): boolean => {
  // Validate DRC phone numbers
  const phoneRegex = /^(0|243|\+243)?[89][0-9]{8}$/;
  return phoneRegex.test(phoneNumber.replace(/\s/g, ''));
};

export const validateBetAmount = (amount: string): boolean => {
  const numAmount = parseFloat(amount);
  return !isNaN(numAmount) && numAmount >= 300;
};