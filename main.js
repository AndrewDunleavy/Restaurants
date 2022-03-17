const Restaurant = require("./restaurant")
const Menu = require("./menu")
const Item = require("./items")
Restaurant.init()
Menu.init()
Item.init()

module.exports = {Restaurant, Menu, Item}