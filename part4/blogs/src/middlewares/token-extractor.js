const tokenExtractor = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization?.startsWith("Bearer ")) {
    req.token = authorization.substring(7);
  }

  next();
};

module.exports = tokenExtractor;
