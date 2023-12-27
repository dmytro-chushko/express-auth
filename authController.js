const User = require("./models/User");
const Role = require("./models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("./config");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };

  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration error", errors });
      }

      const { username, password } = req.body;

      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: "User already exist" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "ADMIN" });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });

      await user.save();

      return res.json({ message: "User was successfully registered" });
    } catch (e) {
      console.log(e);

      res.status(400).json({ messsage: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `User ${username} not found` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const token = generateAccessToken(user._id, user.roles);

      return res.json({ token });
    } catch (e) {
      console.log(e);

      res.status(400).json({ messsage: "Login error" });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (e) {
      console.log(e);

      res.status(400).json({ messsage: "Registration error" });
    }
  }

  async createRole(req, res) {
    try {
      const { roleName } = req.body;

      const newRole = new Role({ value: roleName });

      await newRole.save();

      res.json("role created");
    } catch (e) {
      console.log(e);

      res.status(400).json({ messsage: "Regitration error" });
    }
  }
}

module.exports = new AuthController();
