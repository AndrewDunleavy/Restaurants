const db = require("better-sqlite3")('./restaurants.sqlite')


class Item {
    static all =[]
    static init = function () {
        db.prepare('CREATE TABLE IF NOT EXISTS items (ID  INTEGER PRIMARY KEY, name TEXT,  price TEXT);').run()
    }
    constructor(name, price, allergens){
        this.name = name 
        this.price = price 
        this.allergens = allergens
    }
}

module.exports = Item