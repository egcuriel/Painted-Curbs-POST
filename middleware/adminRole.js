module.exports = (req, res, next) => {
  if (!req.user) {
    res.status(401).send("User is not authenticated");
  }

  if (req.user.role === "admin") {
    next();
  } else {
    res.status(401).send("Unauthorized Access");
  }
};
