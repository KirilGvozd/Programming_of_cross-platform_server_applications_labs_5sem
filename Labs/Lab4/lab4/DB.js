const EventEmitter = require('events');


class DB extends EventEmitter {
    db_data = [
        {id: 1, name: 'Kirill.', bday: '11-09-2001'},
        {id: 2, name: 'Oleg.', bday: '08-04-1994'},
        {id: 3, name: 'Vlad', bday: '01-09-2010'},
        {id: 4, name: 'Natalie', bday: '27-11-2021'},
    ]

    async select() {
        return new Promise((resolve, reject) => {
            resolve(this.db_data);
        });
    };

    async insert(person) {
        return new Promise((resolve, reject) => {
            let foundPersonIndex = this.db_data.findIndex(el => el.id == person.id);
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
            let foundPersonIndex = this.db_data.findIndex(el => el.id == person.id);
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
            let foundPersonIndex = this.db_data.findIndex(el => el.id == id);
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