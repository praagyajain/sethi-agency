export default (message, data) => {
  return {
    successMessage: {
      success: true,
      message: message,
      data: data,
    },
  };
};
