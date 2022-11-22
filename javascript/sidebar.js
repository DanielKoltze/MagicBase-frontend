const sidebarButton = document.querySelector('.sidebarButton')
const sideBar = document.querySelector('.sidebar')
const navBar = document.getElementById('navBar')
const rightNav = document.querySelector('.rightNav')

sidebarButton.addEventListener('click', e => {
    if (sideBar.style.width == 0) {
        sideBar.classList.add('sidebar-open')
        navBar.classList.add('navBar-open')
        rightNav.classList.add('rightNav-open')
    }else{
        sideBar.classList.remove('sidebar-open')
        navBar.classList.remove('navBar-open')
    }

})