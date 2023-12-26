const User = require("./models/User");
const Role = require("./models/Role");
const bcrypt = require("bcryptjs");

class AuthController {
  async registration(req, res) {
    try {
      const { username, password } = req.body;

      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: "User allready exist" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });

      await user.save();

      return res.json({ message: "User was successfully registered" });
    } catch (e) {
      console.log(e);

      res.status(400).json({ messsage: "Regitration error" });
    }
  }

  async login(req, res) {
    try {
    } catch (e) {
      console.log(e);

      res.status(400).json({ messsage: "Regitration error" });
    }
  }

  async getUsers(req, res) {
    try {
    } catch (e) {
      console.log(e);

      res.status(400).json({ messsage: "Regitration error" });
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
