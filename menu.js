const items = require("./items.js")
const db = require("better-sqlite3")('./restaurants.sqlite')
class Menu {
    static init = function() {
        db.prepare('CREATE TABLE IF NOT EXISTS menus (id INTEGER PRIMARY KEY, title TEXT);').run() 
    }
    constructor(restaurant_id, title, id){
        this.restaurant_id = restaurant_id
        this.title = title 
        if (id) {
            this.id = id
        } else {
            const insert = db.prepare('INSERT INTO menus (restaurant_id, title) VALUES (?, ?);')
            console.log(this)
            const info = insert.run(this.restaurant_id, this.title)
            this.id = info.lastInsertRowid          
        }
    
    }
 addItem(item){
     return this.items.push(item)
 }
}

module.exports = Menu