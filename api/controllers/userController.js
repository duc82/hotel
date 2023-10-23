const asyncHandler = require("../utils/asyncHandler");
const db = require("../models/index");
const bcrypt = require("bcryptjs");
const { signToken } = require("../utils/jwt");

const userController = {
  register: asyncHandler(async (req, res) => {
    const { fullName, email, phone, age, password } = req.body;

    const userExists = await db.User.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(400).json({
        message: "Email is already exists",
      });
    }

    const user = await db.User.create({
      fullName,
      email,
      phone,
      age,
      password: bcrypt.hashSync(password),
    });

    res.status(201).json({ message: "Register success", user });
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await db.User.findOne({ where: { email } });
    const isCorrectPassword = await bcrypt.compare(
      password,
      user?.password ?? ""
    );

    if (!user || !isCorrectPassword) {
      return res.status(400).json({ message: "Email or password incorrect" });
    }

    const accessToken = signToken(
      {
        userId: user.id,
        role: user.role,
      },
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login success",
      user,
      accessToken,
    });
  }),

  getMe: asyncHandler(
    asyncHandler(async (req, res) => {
      const { userId } = req.user;

      const user = await db.User.findByPk(userId);
      res.status(200).json(user);
    })
  ),
};

module.exports = userController;
