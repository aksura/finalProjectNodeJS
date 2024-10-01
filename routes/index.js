const router = require("express").Router();
const {getBookmarks, postBookmark,getMovies} = require("../controllers/bookmarkController");
const { register, login } = require("../controllers/userController");
const { auth } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/login", login);

router.get("/bookmarks", getBookmarks);
router.post("/bookmark/:id", postBookmark);

router.get("/movies", getMovies);

module.exports = router;