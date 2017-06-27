const fs = require('fs');
const sql = require('sql.js');
const path = require('path');
const pathName = path.join(__dirname, '..', 'data', 'library.sqlite');
var filebuffer = fs.readFileSync(pathName);
var db = new sql.Database(filebuffer);
module.exports = {
    insert: function(id, title, image) {
        console.log(id + " " + title + " " + image)
        var newstring = "";
        if (title.indexOf("'") !== -1) {
            var split = title.split("'");
            for (var i = 1; i < split.length; i++) {
                newstring += (split[i - 1] + split[i]);
                console.log(newstring)
            }
        }
        db.run("INSERT OR REPLACE INTO library(id, type, title, image) VALUES(" + id + ", 'Podcast', '" + newstring +
            "', '" + image + "');");
    },
    save: function() {
        fs.writeFileSync(pathName, (new Buffer(db.export())));
    },
    select: function() {
        this.lastRes = db.exec('SELECT * FROM library ORDER BY title ASC');
        return this.lastRes;
    },
    getLastRes: function() {
        return this.lastRes;
    },
    delete: function(uri) {
        db.run("DELETE FROM library WHERE id=" + uri);
    },
    setCurrentId: function(id) {
        this.currentId = id
    },
    getCurrentId: function() {
        return this.currentId;
    },
    currentId: null,
    lastRes: null,
}