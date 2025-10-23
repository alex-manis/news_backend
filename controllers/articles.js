const Article = require("../models/article");
const { BadRequestError, ForbiddenError } = require("../utils/errors/errors");

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch((err) => next(err));
};

module.exports.createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch((err) => next(err));
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const currentUserId = req.user._id;

  Article.findOneAndDelete({ _id: articleId, owner: currentUserId })
    .then((deletedArticle) => {
      if (!deletedArticle) {
        throw new ForbiddenError("You cannot delete this article");
      }
      res.send({ data: deletedArticle });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid article id"));
      }
      return next(err);
    });
};
