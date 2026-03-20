export const askChatbot = async (message) => {
  const normalizedMessage = message.toLowerCase();

  let reply = "I can help with menu items, orders, checkout, and delivery details.";

  if (normalizedMessage.includes("menu")) {
    reply = "You can visit the menu page to browse burgers, rice, pizza, and drinks.";
  } else if (normalizedMessage.includes("order")) {
    reply = "Open the orders page to see your order history and tracking progress.";
  } else if (normalizedMessage.includes("delivery")) {
    reply = "The demo system adds a small delivery fee and tracks order progress with a progress bar.";
  }

  return Promise.resolve({ reply });
};
