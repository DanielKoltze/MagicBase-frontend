function landingPage() {
    let template = document.getElementById('landing-page');
    let clone = template.content.cloneNode(true)
    console.log(clone);

    let landingPageClone = clone.getElementById('landing-page-container')
    console.log(landingPageClone)


    pageContainer.replaceChildren(landingPageClone);
}