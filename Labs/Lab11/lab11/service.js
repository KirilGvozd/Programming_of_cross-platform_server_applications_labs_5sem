const fs = require("fs");

class Service {
    getIndexFile = (request, response) => {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(fs.readFileSync("./Task3.html"));
    };

    getHandler = (request, response, databaseFunction, parameter = null) => {
        if (parameter !== null) {
            databaseFunction(parameter)
                .then(records => {
                    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    response.end(JSON.stringify(records.recordset, null, 4));
                })
                .catch(err => {
                    this.errorHandler(response, 422, err.message);
                });
        } else {
            databaseFunction()
                .then(records => {
                    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    response.end(JSON.stringify(records.recordset, null, 4));
                })
                .catch(err => {
                    this.errorHandler(response, 422, err.message);
                });
        }
    }

    workWithPulpit = (request, response, databaseFunction) => {
        let json = '';
        request.on('data', chunk => {
            json += chunk;
        });

        request.on('end', () => {
            json = JSON.parse(json);
            if (request.method === 'POST') {
                if (json.PULPIT === undefined || json.PULPIT_NAME === undefined || json.FACULTY === undefined) {
                    this.errorHandler(response, 422, "Invalid PULPIT parameters");
                    return;
                }
                else if (json.PULPIT.trim() === "" || json.PULPIT_NAME.trim() === "" || json.FACULTY.trim() === "") {
                    this.errorHandler(response, 422, "Invalid PULPIT parameters");
                    return;
                }
            }
            if (json.PULPIT === undefined || json.PULPIT.trim() === "") {
                this.errorHandler(response, 422, "Invalid PULPIT code");
                return;
            }
            databaseFunction(json.PULPIT, json.PULPIT_NAME, json.FACULTY)
                .then(() => {
                    response.end(JSON.stringify(json, null, 4));
                })
                .catch(err => {
                    this.errorHandler(response, 422, err.message);
                });
        });
    }
    workWithSubject = (request, response, databaseFunction) => {
        let json = '';
        request.on('data', (chunk) => {
            json += chunk;
        });

        request.on('end', () => {
            json = JSON.parse(json);
            if (request.method === 'POST') {
                if (json.SUBJECT === undefined || json.SUBJECT_NAME === undefined || json.PULPIT === undefined) {
                    this.errorHandler(response, 422, "Invalid SUBJECT parameters");
                    return;
                }
                else if (json.SUBJECT.trim() === "" || json.SUBJECT_NAME.trim() === "" || json.PULPIT.trim() === "") {
                    this.errorHandler(response, 422, "Invalid SUBJECT parameters");
                    return;
                }
            }
            if (json.SUBJECT === undefined || json.SUBJECT.trim() === "") {
                this.errorHandler(response, 422, "Invalid SUBJECT code");
                return;
            }
            databaseFunction(json.SUBJECT, json.SUBJECT_NAME, json.PULPIT)
                .then(() => {
                    response.end(JSON.stringify(json, null, 4));
                })
                .catch( (error) => {
                    this.errorHandler(response, 422, error.message);
                });
        });
    }
    workWithAuditoriumType = (request, response, databaseFunction) => {
        let json = '';
        request.on('data', (chunk) => {
            json += chunk;
        });

        request.on('end', () => {
            json = JSON.parse(json);
            if (request.method === 'POST') {
                if (json.AUDITORIUM_TYPE === undefined || json.AUDITORIUM_TYPENAME === undefined) {
                    this.errorHandler(response, 422, "Invalid AUDITORIUM_TYPE parameters");
                    return;
                }
                else if (json.AUDITORIUM_TYPE.trim() === "" || json.AUDITORIUM_TYPENAME.trim() === "") {
                    this.errorHandler(response, 422, "Invalid AUDITORIUM_TYPE parameters");
                    return;
                }
            }
            if (json.AUDITORIUM_TYPE === undefined || json.AUDITORIUM_TYPE.trim() === "") {
                this.errorHandler(response, 422, "Invalid AUDITORIUM_TYPE code");
                return;
            }
            databaseFunction(json.AUDITORIUM_TYPE, json.AUDITORIUM_TYPENAME)
                .then(() => {
                    response.end(JSON.stringify(json, null, 4));
                })
                .catch( (error) => {
                    this.errorHandler(response, 422, error.message);
                });
        });
    }
    workWithAuditorium = (request, response, databaseFunction) => {
        let json = '';
        request.on('data', (chunk) => {
            json += chunk;
        });

        request.on('end', () => {
            json = JSON.parse(json);
            if (request.method === 'POST') {
                if (json.AUDITORIUM === undefined || json.AUDITORIUM_NAME === undefined
                    || json.AUDITORIUM_CAPACITY === undefined || json.AUDITORIUM_TYPE === undefined) {
                    this.errorHandler(response, 422, "Invalid AUDITORIUM parameters");
                    return;
                }
                else if (json.AUDITORIUM.trim() === "" || json.AUDITORIUM_NAME.trim() === ""
                    || !Number(json.AUDITORIUM_CAPACITY) || json.AUDITORIUM_TYPE.trim() === "") {
                    this.errorHandler(response, 422, "Invalid AUDITORIUM parameters");
                    return;
                }
            }
            if (json.AUDITORIUM === undefined || json.AUDITORIUM.trim() === "") {
                this.errorHandler(response, 422, "Invalid AUDITORIUM code");
                return;
            }
            if (!Number(json.AUDITORIUM_CAPACITY)) {
                this.errorHandler(response, 422, "Invalid AUDITORIUM capacity");
                return;
            }
            databaseFunction(json.AUDITORIUM, json.AUDITORIUM_NAME, json.AUDITORIUM_CAPACITY, json.AUDITORIUM_TYPE)
                .then(() => {
                    response.end(JSON.stringify(json, null, 4));
                })
                .catch( (error) => {
                    this.errorHandler(response, 422, error.message);
                });
        });
    }

    workWithFaculty = (request, response, databaseFunction) => {
        let json = '';
        request.on('data', (chunk) => {
            json += chunk;
        });

        request.on('end', () => {
            json = JSON.parse(json);
            databaseFunction(json.FACULTY, json.FACULTY_NAME)
                .then(() => {
                    response.end(JSON.stringify(json, null, 4));
                })
                .catch( (error) => {
                    this.errorHandler(response, 422, error.message);
                });
        });
    }

    deleteHandler = (request, response, databaseFunction, parameter) => {
        databaseFunction(parameter)
            .then(() => {
                response.end(JSON.stringify({key: parameter}, null, 4));
            })
            .catch( (error) => {
                this.errorHandler(response, 422, error.message);
            });
    }

    errorHandler = (response, errorCode, errorMessage) => {
        response.writeHead(errorCode, 'Error while processing the request', {'Content-Type': 'application/json; charset=utf-8'});
        response.end(JSON.stringify({errorCode: errorCode, errorMessage: errorMessage}, null, 4));
    }

}
exports.Service = Service;