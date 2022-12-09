function landingPage() {
    let template = document.getElementById('landing-page');
    let clone = template.content.cloneNode(true)
    console.log(clone);

    let landingPageClone = clone.getElementById('landing-page-container')
    console.log(landingPageClone)


    pageContainer.replaceChildren(landingPageClone);


    loader = document.getElementById('preload');
    loadNow(1);
}




var loader;
function loadNow(opacity) {
    if (opacity <= 0) {
        displayContent();
    } else {
        loader.style.opacity = opacity;
        window.setTimeout(function () {
            loadNow(opacity - 0.05)
        }, 100)
    }
}
function displayContent() {
    loader.style.display = 'none';
}


function show() {
    AB = document.querySelector(".containerlogo");
    AB.style.display = "inline";
}

setTimeout("show()", 2500);



