const { Bookmark } = require("../models");
const { verify } = require("jsonwebtoken");
const { User,Movie } = require("../models");

exports.getBookmarks = async (req, res) => {

  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw new Error("Token not found");
    }

    const [type, token] = authorization.split(" ");

    if (!token) {
      throw new Error("Token not found");
    }

    const decoded = verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) throw new Error("User is not registered");
    const userId = user.id;

    try {
      const bookmarks = await Bookmark.findAll({
        where: { userId },
        include: [{
          model: Movie,
          attributes: ['id', 'title', 'synopsis', /* other columns you want to fetch */]
        }]
      });

      const movies = bookmarks.map(bookmark => bookmark.Movie);      
      res.status(200).json(movies);

    } catch (error) {
      console.error(error);
      return [];
    }


  } catch (error) {
    return res.status(401).json({
      error: "Unauthenticated",
      message: error.message,
    });
  }

};

exports.postBookmark = async (req, res) => {

  const { authorization } = req.headers;
  //console.log("Authorization postBookmark: " + authorization);
  try {
    if (!authorization) {
      throw new Error("Token not found");
    }

    const [type, token] = authorization.split(" ");

    if (!token) {
      throw new Error("Token not found");
    }
    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) throw new Error("User is not registered");

    const movieId = req.params.id;

    const movie = await Movie.findByPk(movieId);

    if (!movie) throw new Error("Movie is not exist");

    const title = movie.title;
    const insertedBookmark = await Bookmark.create({
      userId,
      movieId
    });

    insertedBookmark.__factory = { autoIncrementField: 'id' }
    var id = insertedBookmark.id;

    res.status(200).json({
      message: 'Success Adding New Bookmark',
      id, userId, movieId, title
    });

  } catch (error) {
    return res.status(401).json({
      error: "Unauthenticated",
      message: error.message,
    });
  }

};

exports.getMovies = async (req, res) => {

  const { authorization } = req.headers;
  //console.log("Authorization postBookmark: " + authorization);
  try {
    if (!authorization) {
      throw new Error("Token not found");
    }

    const [type, token] = authorization.split(" ");

    if (!token) {
      throw new Error("Token not found");
    }
    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) throw new Error("User is not registered");

    try {
      const movies = await Movie.findAll();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching movies' });
    }
   
  } catch (error) {
    return res.status(401).json({
      error: "Unauthenticated",
      message: error.message,
    });
  }

};