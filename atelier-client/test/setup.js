import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;
const initialData = {
    user: {
        "id": "2cae43ac-c8fd-4867-86c9-c908754f8c55",
        "firstname": "Layla",
        "lastname": "Horton",
        "entityId": "125bb049-4ef3-47a9-80df-2283aff09762",
        "language": "TU"
    },
    entity: {"id": "125bb049-4ef3-47a9-80df-2283aff09762", "name": "company.com", "sector": "sector"}
};

global.document = doc;
global.window = win;
global['initialData'] = initialData;

// fuck you javascript
// TODO Object.values n'existe pas sur des vieux navigateurs du coup ? Pk node récent fait la gueule ?
// rajouter ce code derrière un if(!Object.values) serait peut-être pas déconnant pour l'app du coup ?
Object.values = function (o) {
    return Object.keys(o).map(k => o[k]);
};

Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});

chai.use(chaiImmutable);

