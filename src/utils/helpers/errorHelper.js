export default (errorMessage) => {
  return {
    errorMessage: {
      success: false,
      message: errorMessage,
    },
  };
};
