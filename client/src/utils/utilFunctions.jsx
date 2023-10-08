export const getDate = (ticket) => {
  return `${new Date(ticket?.createdAt).getDate()} - ${new Date(
    ticket?.createdAt
  ).getMonth()} - ${new Date(ticket?.createdAt).getFullYear()}`;
};
export const getName = (ticket, type) => {
  if (type === "afr")
    return `${ticket?.afr?.last_name} ${ticket?.afr?.first_name}`.toLowerCase();
  else if (type === "adz")
    return `${ticket?.adz?.last_name} ${ticket?.adz?.first_name}`.toLowerCase();
};
export const getEmail = (ticket, type) => {
  if (type === "afr") return `${ticket?.afr?.email}`;
  else if (type === "adz") return `${ticket?.adz?.email}`;
};
export const getDDL = (ticket) => {
  return (
    new Date(ticket?.deadline).getDate() +
    " - " +
    new Date(ticket?.deadline).getMonth() +
    " - " +
    new Date(ticket?.deadline).getFullYear()
  );
};
