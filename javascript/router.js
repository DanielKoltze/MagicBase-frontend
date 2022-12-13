let routes = {};
let templates = {};

const DEFAULT_ROUTE = "http://127.0.0.1:5501"
const COLLECTION_ROUTE = "#/collection"
const pageContainer = document.querySelector('#page-container');



function route(path, template) {
    if (typeof template === 'function') {
        return routes[path] = template;
    }
    else if (typeof template === 'string') {
        return routes[path] = templates[template];
    }
    else {
        return;
    }

}
function template(name, templateFunction) {
    return templates[name] = templateFunction
}

template('home', () => {
    landingPage();
})

template('collection', () => {
    collection();
})

template('inspiration', () => {
    inspiration();
})

route('/', 'home');
route('/collection', 'collection');
route('/inspiration', 'inspiration')

function resolveRoute(route) {
    try {
        return routes[route];
    }
    catch (e) {
        throw new Error(`Route ${route} not found`)
    }
}

function router(evt) {
    let url = window.location.hash.slice(1) || '/';
    let route = resolveRoute(url);

    // kører den metode den lige har fået gemt ovenover, som f.eks. vil være () => { home();} i starten 
    route();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

console.log(templates);
console.log(routes);




