const mssql = require('mssql');

let config = {
    user: 'Kirill', password: 'Kirill_password', server: 'localhost', database: 'Lab11_DB',
    pool: {max: 10, min: 4},
    options: {trustServerCertificate: true}
};

class DB {
    pool = new mssql.ConnectionPool(config)
        .connect()
        .then(pool => {
            console.log(`Connected to ${config.database} database`);
            return pool;
        })
        .catch( (error) => console.error(`Connection to ${config.database} database failed: `, error.message));

    getFaculties = () => {
        return this.pool.then(pool => pool.request().query('select * from FACULTY'));
    }
    getPulpits = () => {
        return this.pool.then(pool => pool.request().query('select * from PULPIT'));
    }
    getSubjects = () => {
        return this.pool.then(pool => pool.request().query('select * from SUBJECT'));
    }
    getAuditoriumsTypes = () => {
        return this.pool.then(pool => pool.request().query('select * from AUDITORIUM_TYPE'));
    }
    getAuditoriums = () => {
        return this.pool.then(pool => pool.request().query('select * from AUDITORIUM'));
    }

    getPulpitsByFaculty = async (faculty) => {
        let faculties = (await this.getFaculties()).recordset;
        let found = false;
        for (let facult of faculties) {
            if (facult.FACULTY.trim() === faculty) {
                found = true;
            }
        }
        if (!found) {
            throw new Error(`Faculty ${faculty} doesn\'t exist`);
        }
        return this.pool.then(pool => pool.request().input('faculty', mssql.NVarChar, faculty)
            .query('select * from PULPIT where FACULTY=@faculty'));
    }
    getAuditoriumsByAuditoriumType = async (auditoriumType) => {
        let auditTypes = (await this.getAuditoriumsTypes()).recordset;
        let found = false;
        for (let type of auditTypes) {
            if (type.AUDITORIUM_TYPE.trim() === auditoriumType) {
                found = true;
            }
        }
        if (!found) {
            throw new Error(`Auditorium type ${auditoriumType} doesn\'t exist`);
        }
        return this.pool.then(pool => {
            return pool.request()
                .input('auditoriumType', mssql.NVarChar, auditoriumType)
                .query('select * from AUDITORIUM where AUDITORIUM_TYPE = @auditoriumType');
        })
    }
    insertFaculties = (faculty, facultyName) => {
        return this.pool.then(pool => {
            return pool.request()
                .input('faculty', mssql.NVarChar, faculty)
                .input('facultyName', mssql.NVarChar, facultyName)
                .query('insert FACULTY(FACULTY, FACULTY_NAME) values (@faculty, @facultyName)');
        })
    }

    insertPulpits = (pulpit, pulpitName, faculty) => {
        return this.pool.then(pool => {
            return pool.request()
                .input('pulpit', mssql.NVarChar, pulpit)
                .input('pulpitName', mssql.NVarChar, pulpitName)
                .input('faculty', mssql.NVarChar, faculty)
                .query('insert PULPIT(PULPIT, PULPIT_NAME, FACULTY) values (@pulpit, @pulpitName, @faculty)');
        });
    }

    insertSubjects = (subject, subjectName, pulpit) => {
        return this.pool.then(pool => {
            return pool.request()
                .input('subject', mssql.NVarChar, subject)
                .input('subjectName', mssql.NVarChar, subjectName)
                .input('pulpit', mssql.NVarChar, pulpit)
                .query('insert SUBJECT(SUBJECT, SUBJECT_NAME, PULPIT) values (@subject, @subjectName, @pulpit)');
        });
    }

    insertAuditoriumTypes = (audType, audTypeName) => {
        return this.pool.then(pool => {
            return pool.request()
                .input('audType', mssql.NVarChar, audType)
                .input('audTypeName', mssql.NVarChar, audTypeName)
                .query('insert AUDITORIUM_TYPE(AUDITORIUM_TYPE, AUDITORIUM_TYPENAME) values (@audType, @audTypeName)');
        });
    }

    insertAuditoriums = (auditorium, audName, audCapacity, audType) => {
        return this.pool.then(pool => {
            return pool.request()
                .input('auditorium', mssql.NVarChar, auditorium)
                .input('audName', mssql.NVarChar, audName)
                .input('audCapacity', mssql.Int, audCapacity)
                .input('audType', mssql.NVarChar, audType)
                .query('INSERT AUDITORIUM(AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE)' +
                    ' values(@auditorium, @audName, @audCapacity, @audType)');
        });
    }

    updateFaculties = async (faculty, facultyName) => {
        let faculties = (await this.getFaculties()).recordset;
        let found = false;
        for (let facult of faculties) {
            if (facult.FACULTY.trim() === faculty) {
                found = true;
            }
        }
        if (!found) {
            throw new Error(`Faculty ${faculty} doesn't exist`);
        }
        return this.pool.then(pool => {
            return pool.request()
                .input('faculty', mssql.NVarChar, faculty)
                .input('facultyName', mssql.NVarChar, facultyName)
                .query('update FACULTY set FACULTY_NAME = @facultyName where FACULTY = @faculty');
        });
    }

    updatePulpits = async (pulpit, pulpitName, faculty) => {
        let pulpits = (await this.getPulpits()).recordset;
        let found = false;
        for (let pulp of pulpits) {
            if (pulp.PULPIT.trim() === pulpit) {
                found = true;
            }
        }
        if (!found) {
            throw new Error(`Pulpit ${pulpitName} doesn\'t exist`);
        }
        return this.pool.then(pool => {
            return pool.request()
                .input('pulpit', mssql.NVarChar, pulpit)
                .input('pulpitName', mssql.NVarChar, pulpitName)
                .input('faculty', mssql.NVarChar, faculty)
                .query('update PULPIT set PULPIT_NAME = @pulpitName, FACULTY = @faculty where PULPIT = @pulpit');
        });
    }

    updateSubjects = async (subject, subjectName, pulpit) => {
        let subjects = (await this.getSubjects()).recordset;
        let found = false;
        for (let sub of subjects) {
            if (sub.SUBJECT.trim() === subject) {
                found = true;
            }
        }
        if (!found) {
            throw new Error(`Subject ${subjectName} doesn\'t exist`);
        }
        return this.pool.then(pool => {
            return pool.request()
                .input('subject', mssql.NVarChar, subject)
                .input('subjectName', mssql.NVarChar, subjectName)
                .input('pulpit', mssql.NVarChar, pulpit)
                .query('update SUBJECT set SUBJECT_NAME = @subjectName, PULPIT = @pulpit where SUBJECT = @subject');
        });
    }

    updateAuditoriumTypes = async (audType, audTypeName) => {
        let audTypes = (await this.getAuditoriumsTypes()).recordset;
        let found = false;
        for (let type of audTypes) {
            if (type.AUDITORIUM_TYPE.trim() === audType) {
                found = true;
            }
        }
        if (!found) {
            throw new Error(`Auditorium type ${audTypeName} doesn\'t exist`);
        }
        return this.pool.then(pool => {
            return pool.request()
                .input('audType', mssql.NVarChar, audType)
                .input('audTypeName', mssql.NVarChar, audTypeName)
                .query('update AUDITORIUM_TYPE set AUDITORIUM_TYPENAME = @audTypeName where AUDITORIUM_TYPE = @audType');
        });
    }

    updateAuditoriums = async (auditorium, audName, audCapacity, audType) => {
        let auditoriums = (await this.getAuditoriums()).recordset;
        let found = false;
        for (let aud of auditoriums) {
            if (aud.AUDITORIUM.trim() === auditorium) {
                found = true;
            }
        }
        if (!found) {
            throw new Error(`Auditorium ${audName} doesn\'t exist`);
        }
        return this.pool.then(pool => {
            return pool.request()
                .input('auditorium', mssql.NVarChar, auditorium)
                .input('audName', mssql.NVarChar, audName)
                .input('audCapacity', mssql.Int, audCapacity)
                .input('audType', mssql.NVarChar, audType)
                .query('update AUDITORIUM set AUDITORIUM_NAME = @audName, AUDITORIUM_CAPACITY = ' +
                    '@audCapacity, AUDITORIUM_TYPE = @audType where AUDITORIUM = @auditorium');
        });
    }

    deleteFaculty = async (faculty) => {
        let faculties = (await this.getFaculties()).recordset;
        let found = false;
        for (let fac of faculties) {
            if (fac.FACULTY.trim() === faculty) {
                found = true;
            }
        }
        if (!found) {
            throw new Error(`Faculty ${faculty} doesn\'t exist`);
        }
        return this.pool.then(pool => {
            return pool.request()
                .input('faculty', mssql.NVarChar, faculty)
                .query('delete from FACULTY where faculty = @faculty')
        });
    }

    deletePulpit = async (pulpit) => {
        let pulpits = (await this.getPulpits()).recordset;
        let found = false;
        for (let pul of pulpits) {
            if (pul.PULPIT.trim() === pulpit) {
                found = true;
            }
        }
        if (!found) {
            throw new Error(`Pulpit ${pulpit} doesn\'t exist`);
        }
        return this.pool.then(pool => {
            return pool.request()
                .input('pulpit', mssql.NVarChar, pulpit)
                .query('delete from PULPIT where pulpit = @pulpit')
        });
    }

    deleteSubject = async (subject) => {
        let subjects = (await this.getSubjects()).recordset;
        let found = false;
        for (let sub of subjects) {
            if (sub.SUBJECT.trim() === subject) {
                found = true;
            }
        }
        if (!found) {
            throw new Error("Subject doesn\'t exist");
        }
        return this.pool.then(pool => {
            return pool.request()
                .input('subject', mssql.NVarChar, subject)
                .query('delete from SUBJECT where subject = @subject')
        });
    }

    deleteAuditoriumType = async (audType) => {
        let audTypes = (await this.getAuditoriumsTypes()).recordset;
        let found = false;
        for (let type of audTypes) {
            if (type.AUDITORIUM_TYPE.trim() === audType) {
                found = true;
            }
        }
        if (!found) {
            throw new Error(`Auditorium type ${audType} doesn\'t exist`);
        }
        return this.pool.then(pool => {
            return pool.request()
                .input('type', mssql.NVarChar, audType)
                .query('delete from AUDITORIUM_TYPE where AUDITORIUM_TYPE = @type')
        });
    }

    deleteAuditorium = async (auditorium) => {
        let auditoriums = (await this.getAuditoriums()).recordset;
        let found = false;
        for (let aud of auditoriums) {
            if (aud.AUDITORIUM.trim() === auditorium) {
                found = true;
            }
        }
        if (!found) {
            throw new Error(`Auditorium ${auditorium} doesn\'t exist`);
        }
        return this.pool.then(pool => {
            return pool.request()
                .input('auditorium', mssql.NVarChar, auditorium)
                .query('delete from AUDITORIUM where AUDITORIUM = @auditorium')
        });
    }
}

exports.DB = DB;