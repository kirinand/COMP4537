export const getDate = (name) => {
  const now = new Date();
  return `<p style='color:blue;'>Hello ${name}, What a beautiful day. Server current date and time is ${now.toString()}</p>`;
}
