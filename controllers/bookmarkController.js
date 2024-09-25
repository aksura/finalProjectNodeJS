const { Bookmark } = require("../models");

exports.getBookmarks = async (req, res) => {

    const { authorization } = req.headers;
  console.log("Authorization : " + authorization);
  try {
    if (!authorization) {
      throw new Error("Token not found");
    }

    const [type, token] = authorization.split(" ");

    if (!token) {
      throw new Error("Token not found");
    }

    
    res.status(200).json("statusGET:ok");

  } catch (error) {
    return res.status(401).json({
      error: "Unauthenticated",
      message: error.message,
    });
  }

};

exports.postBookmark = async (req, res) => {

    const { authorization } = req.headers;
  console.log("Authorization : " + authorization);
  try {
    if (!authorization) {
      throw new Error("Token not found");
    }

    const [type, token] = authorization.split(" ");

    if (!token) {
      throw new Error("Token not found");
    }

    res.status(200).json("statusPOST:ok");

  } catch (error) {
    return res.status(401).json({
      error: "Unauthenticated",
      message: error.message,
    });
  }

};