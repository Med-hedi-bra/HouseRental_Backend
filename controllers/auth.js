const User = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    let encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      email: email, // sanitize: convert email to lowercase
      password: encryptedPassword,
      token:""
    });
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "6h" }
    );
    // save user token
   user.token = token
  

    // return new user
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error });
  }
};

exports.login = async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email:email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "6h",
        }
      );

        user.token = token
    

      // user
      res.status(200).json(user);
    }
    else{
        res.status(400).json({ error: "Invalid Credentials" });

    }
  } catch (err) {
    console.log(err);
  }
}; 
