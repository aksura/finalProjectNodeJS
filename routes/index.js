const router = require("express").Router();
const {todo} = require("../controllers/todoController");
const {getBookmarks, postBookmark} = require("../controllers/bookmarkController");
const { register, login } = require("../controllers/userController");
const { auth } = require("../middlewares/auth");

router.get("/todos", todo);
router.post("/register", register);
router.post("/login", login);
router.get("/login", login);

router.get("/bookmarks", getBookmarks);
router.post("/bookmark/:id", postBookmark);

module.exports = router;