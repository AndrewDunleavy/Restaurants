const path = require("path")
const Item = require('./items')
const db = require("better-sqlite3")(path.join(__dirname, 'restaurants.sqlite'))
class Menu {
    static all = []
    static init = function() {
        db.prepare('CREATE TABLE IF NOT EXISTS menus (id INTEGER PRIMARY KEY, title TEXT);').run() 
    }
    constructor(restaurant_id, title, id){
        this.restaurant_id = restaurant_id
        this.title = title 
        this.menuItems = []
        if (id) {
            this.id = id
        } else {
            const insert = db.prepare('INSERT INTO menus (restaurant_id, title) VALUES (?, ?);')
            console.log(this)
            const info = insert.run(this.restaurant_id, this.title)
            this.id = info.lastInsertRowid          
        }
        Menu.all.push(this)
    }
 addItem(item){
     return this.items.push(item)
 }

 updateMenu(updates) {

    this.title = updates.title || this.title
    this.restaurant_id = updates.restaurant_id || this.restaurant_id
    this.menuItems = updates.menuItems|| this.menuItems

    const update = db.prepare('UPDATE menus SET restaurant_id =?, title =? WHERE id = ?;')
    update.run(this.restaurant_id,this.title,this.id)
}

 deleteMenu() {
    db.prepare('DELETE FROM menus WHERE id=?;').run(this.id)
    const index = Menu.all.indexOf(this)
    Menu.all.splice(index, 1)
}


}

module.exports = Menu