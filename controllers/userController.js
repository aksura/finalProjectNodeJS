const { User } = require("../models");
const { hash, genSalt } = require("bcrypt");

exports.register = async (req, res, next) => {

    //console.log(req.body);
    const { name, username, email, password, role, phoneNumber, address } = req.body;
  
    try {
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);        
      
      const userInsert = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
        role,
        phoneNumber,
        address        
      });

      userInsert.__factory = { autoIncrementField: 'id' }
      var id = userInsert.id;
      
      res.status(200).json({
        message: 'Success Creating New User',
        data: { id, name, username, email, role, phoneNumber, address }
      });
    } catch (error) {
      next(error);
    }
  };

exports.login = async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error("Unauthenticated");
        }

        
        if (!user.verify(password)) {
            throw new Error("Unauthenticated");
          }
        
        const token = user.generateToken();
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({
            error: "Unauthenticated",
            message: "Invalid email or password",
        });
    }
};

/*exports.login = async (req, res) => {
    res.status(200).json({"Status" : "Under Construction"});
};*/

