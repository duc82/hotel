'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "name" to table "Rooms"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2023-10-23T05:29:19.336Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Rooms",
        "name",
        {
            "type": Sequelize.STRING,
            "field": "name"
        }
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
