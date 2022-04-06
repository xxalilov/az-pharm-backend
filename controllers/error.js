exports.get404 = (req, res, next) => {
  res.render("errors/404");
};

exports.get500 = (req, res, next) => {
  res.render("errors/500");
};
