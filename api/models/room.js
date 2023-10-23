"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.hasOne(models.RoomType, {
        as: "roomType",
        foreignKey: "RoomId",
      });
      Room.hasMany(models.Booking, {
        as: "bookings",
        foreignKey: "RoomId",
      });
    }
  }
  Room.init(
    {
      name: DataTypes.STRING,
      number: DataTypes.INTEGER,
      floor: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
