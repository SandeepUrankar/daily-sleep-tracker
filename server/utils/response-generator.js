function responseGenerator(status, message, data) {
  const response = {
    status: status,
    message: message,
    data: data || "Nothing",
  };
  return response;
}

module.exports = { responseGenerator };
