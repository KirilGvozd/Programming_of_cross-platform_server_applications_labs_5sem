const EventEmitter = require('events');


class DB extends EventEmitter {
    db_data = [
        {id: 1, name: 'Kirill', bday: '12-12-2012'},
        {id: 2, name: 'Oleg', bday: '11-11-2011'},
        {id: 3, name: 'Natalie.', bday: '10-10-2010'},
    ]

    async select() {
        return new Promise((resolve, reject) => {
            resolve(this.db_data);
        });
    };

    async insert(person) {
        return new Promise((resolve, reject) => {
            let foundPersonIndex = this.db_data.findIndex(el => el.id === person.id);
            if (foundPersonIndex === -1) {
                this.db_data.push(person);
                resolve(person);
            } else {
                reject(createError("Found person with id " + person.id));
            }
        })
    };

    async update(person) {
        return new Promise((resolve, reject) => {
            let foundPersonIndex = this.db_data.findIndex(el => el.id === person.id);
            if (foundPersonIndex !== -1) {
                this.db_data[foundPersonIndex] = person;
                resolve(person);
            } else {
                reject(createError("There's no person with id " + person.id));
            }
        });
    };

    async delete(id) {
        return new Promise((resolve, reject) => {
            let foundPersonIndex = this.db_data.findIndex(el => el.id === id);
            if (foundPersonIndex !== -1) {
                this.db_data.splice(foundPersonIndex, 1);
                resolve(id);
            } else {
                reject(createError("There's no person with id " + id));
            }
        });
    }
}

const createError = (message) => {
    return {
        error: message
    }
}

module.exports.DB = DB;
