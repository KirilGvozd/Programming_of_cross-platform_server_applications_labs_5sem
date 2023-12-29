const http = require('http');
const url = require("url");
const Service = require('./service').Service;
const DB = require('./database').DB;

const database = new DB();
const service = new Service();

http.createServer((request, response) => {
    let pathname = decodeURI(url.parse(request.url).pathname);
    let path = pathname.split('/')[1] + '/' + pathname.split('/')[2];
    let codeParameter = pathname.split('/')[3];
    let additionalParameter = pathname.split('/')[4];

    if (request.method === 'GET' && pathname === '/') {
        service.getIndexFile(request, response);
    } else if (request.method === 'GET') {
        switch (path) {
            case 'api/faculties':
                console.log('GET api/faculties');
                service.getHandler(request, response, database.getFaculties);
                break;
            case 'api/pulpits':
                console.log('GET api/pulpits');
                service.getHandler(request, response, database.getPulpits);
                break;
            case 'api/subjects':
                console.log('GET api/subjects');
                service.getHandler(request, response, database.getSubjects);
                break;
            case 'api/auditoriumstypes':
                console.log('GET api/auditoriumstypes');
                service.getHandler(request, response, database.getAuditoriumsTypes);
                break;
            case 'api/auditoriums':
                console.log('GET api/auditoriums');
                service.getHandler(request, response, database.getAuditoriums);
                break;
            case 'api/faculty':
                console.log(`GET api/faculty/${codeParameter}/${additionalParameter}`);
                if (codeParameter === undefined || additionalParameter === undefined || additionalParameter !== "pulpits") {
                    service.errorHandler(response, 400, 'Invalid parameters');
                } else {
                    service.getHandler(request, response, database.getPulpitsByFaculty, codeParameter);
                }
                break;
            case 'api/auditoriumtypes':
                console.log(`GET api/auditoriumtypes/${codeParameter}/${additionalParameter}`);
                if (codeParameter === undefined || additionalParameter === undefined || additionalParameter !== "auditoriums") {
                    service.errorHandler(response, 400, 'Invalid parameters');
                } else {
                    service.getHandler(request, response, database.getAuditoriumsByAuditoriumType, codeParameter);
                }
                break;
            default:
                service.errorHandler(response, 404, 'Not found');
                break;
        }
    } else if (request.method === 'POST') {
        switch (path) {
            case 'api/pulpits':
                console.log('POST api/pulpits');
                service.workWithPulpit(request, response, database.insertPulpits);
                break;
            case 'api/subjects':
                console.log('POST api/subjects');
                service.workWithSubject(request, response, database.insertSubjects);
                break;
            case 'api/auditoriumstypes':
                console.log('POST api/auditoriumstypes');
                service.workWithAuditoriumType(request, response, database.insertAuditoriumTypes);
                break;
            case 'api/auditoriums':
                console.log('POST api/auditoriums');
                service.workWithAuditorium(request, response, database.insertAuditoriums);
                break;
            default:
                service.errorHandler(response, 404, 'Not found');
                break;
        }
    } else if (request.method === 'PUT') {
        switch (path) {
            case 'api/faculties':
                console.log('PUT api/faculties');
                service.workWithFaculty(request, response, database.updateFaculties);
                break;
            case 'api/pulpits':
                console.log('PUT api/pulpits');
                service.workWithPulpit(request, response, database.updatePulpits);
                break;
            case 'api/subjects':
                console.log('PUT api/subjects');
                service.workWithSubject(request, response, database.updateSubjects);
                break;
            case 'api/auditoriumstypes':
                console.log('PUT api/auditoriumstypes');
                service.workWithAuditoriumType(request, response, database.updateAuditoriumTypes);
                break;
            case 'api/auditoriums':
                console.log('PUT api/auditoriums');
                service.workWithAuditorium(request, response, database.updateAuditoriums);
                break;
            default:
                service.errorHandler(response, 404, 'Not found');
                break;
        }
    } else if (request.method === 'DELETE') {
        if (codeParameter === undefined || codeParameter === "") {
            service.errorHandler(response, 400, 'Invalid parameters');
        }
        switch (path) {
            case 'api/faculties':
                console.log('DELETE api/faculties');
                service.deleteHandler(request, response, database.deleteFaculty, codeParameter);
                break;
            case 'api/pulpits':
                console.log('DELETE api/pulpits');
                service.deleteHandler(request, response, database.deletePulpit, codeParameter);
                break;
            case 'api/subjects':
                console.log('DELETE api/subjects');
                service.deleteHandler(request, response, database.deleteSubject, codeParameter);
                break;
            case 'api/auditoriumstypes':
                console.log('DELETE api/auditoriumstypes');
                service.deleteHandler(request, response, database.deleteAuditoriumType, codeParameter);
                break;
            case 'api/auditoriums':
                console.log('DELETE api/auditoriums');
                service.deleteHandler(request, response, database.deleteAuditorium, codeParameter);
                break;
            default:
                service.errorHandler(response, 404, 'Not found');
                break;
        }
    } else {
        service.errorHandler(response, 405, 'Incorrect method');
    }
}).listen(3000, () => console.log('Server is running at http://localhost:3000'));