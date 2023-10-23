const db = require("../models/index");
const asyncHandler = require("../utils/asyncHandler");

const roomController = {
  getAll: asyncHandler(async (req, res) => {
    const rooms = await db.Room.findAll({
      include: [
        {
          model: db.RoomType,
          as: "roomType",
        },
      ],
    });

    res.status(200).json(rooms);
  }),

  getById: asyncHandler(async (req, res) => {
    const room = await db.Room.findByPk(req.params.id, {
      include: [
        {
          model: db.RoomType,
          as: "roomType",
        },
      ],
    });

    res.status(200).json(room);
  }),
};

module.exports = roomController;
