"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "John Doe",
          email: "johndoe@gmail.com",
          age: 24,
          phone: "029592858",
          password: bcrypt.hashSync("123456"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Duc Dang",
          email: "duc@gmail.com",
          age: 20,
          phone: "0123456789",
          password: bcrypt.hashSync("123456"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Le Hung",
          email: "lehung@gmail.com",
          age: 20,
          phone: "0987654321",
          password: bcrypt.hashSync("123456"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
