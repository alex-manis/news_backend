module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
};
