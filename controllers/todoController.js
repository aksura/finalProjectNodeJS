const { Todo } = require("../models");

exports.todo = async (req, res) => {
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

    const todos = await Todo.findAll();
    res.status(200).json(todos);

  } catch (error) {
    return res.status(401).json({
      error: "Unauthenticated",
      message: error.message,
    });
  }


};

/*exports.todo = async (req, res) => {
  res.status(200).json({"Status" : "Under Construction"});
};*/

