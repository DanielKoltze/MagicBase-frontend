const sidebarButton = document.querySelector('.sidebarButton')
const sideBar = document.querySelector('.sidebar')
const navBar = document.getElementById('navBar')
const leftNav = document.querySelector('.leftNav')
let isClosed = true

sidebarButton.addEventListener('click', e => {
    if (isClosed) {
        sideBar.classList.add('sidebar-open')
        navBar.classList.add('navBar-open')
        leftNav.classList.add('leftNav-open')
        sideBar.classList.remove('sidebar-close')
        navBar.classList.remove('navBar-close')
        leftNav.classList.remove('leftNav-close')
        isClosed = false
        hej()
    }else{
        sideBar.classList.remove('sidebar-open')
        navBar.classList.remove('navBar-open')
        leftNav.classList.remove('leftNav-open')
        sideBar.classList.add('sidebar-close')
        navBar.classList.add('navBar-close')
        leftNav.classList.add('leftNav-close')
        isClosed = true
    }

})

function hej(){
    if(isClosed === false && sideBar.getBoundingClientRect().right < trigger.offsetX){
        document.addEventListener('click', e => {
  
       
            sideBar.classList.remove('sidebar-open')
            navBar.classList.remove('navBar-open')
            leftNav.classList.remove('leftNav-open')
            sideBar.classList.add('sidebar-close')
            navBar.classList.add('navBar-close')
            leftNav.classList.add('leftNav-close')
            isClosed = true
        
    })

    }


}
