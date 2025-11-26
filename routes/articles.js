const router = require("express").Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");
const auth = require("../middlewares/auth");
const {
  validateCreateArticle,
  validateArticleId,
} = require("../middlewares/validation");

router.get("/", auth, getArticles);

router.post("/", auth, validateCreateArticle, createArticle);

router.delete("/:articleId", auth, validateArticleId, deleteArticle);

module.exports = router;
