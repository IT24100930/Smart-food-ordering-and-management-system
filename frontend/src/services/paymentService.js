export const processPayment = async (paymentData) =>
  Promise.resolve({
    success: true,
    message: `Payment method selected: ${paymentData.paymentMethod}`,
  });
