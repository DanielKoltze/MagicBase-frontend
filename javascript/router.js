let routes = {};
let templates = {};

const DEFAULT_ROUTE = "http://127.0.0.1:5501/index.html"
const COLLECTION_ROUTE = "#/collection"

const appDiv = document.getElementById("container");

function route(path, template) {
  if (typeof template === "function") {
    return (routes[path] = template);
  } else if (typeof template === "string") {
    return (routes[path] = templates[template]);
  } else {
    return;
  }
}
function template(name, templateFunction) {
  return (templates[name] = templateFunction);
}


template("home", () => {
  home();
});
template("my collection", () => {
  collection();
});
template("inspiration", () => {
  admin();
});

route("/admin", "admin");
route("/", "home");
route(COLLECTION_ROUTE, "my collection");

function resolveRoute(route) {
  try {
    return routes[route];
  } catch (e) {
    throw new Error(`Route ${route} not found`);
  }
}

function router(evt) {
  let url = window.location.hash.slice(1) || "/";
  let route = resolveRoute(url);

  // kører den metode den lige har fået gemt ovenover, som f.eks. vil være () => { home();} i starten
  route();
}

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
