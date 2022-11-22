const sidebarButton = document.querySelector('.sidebarButton')
const sideBar = document.querySelector('.sidebar')

sidebarButton.addEventListener('click', e => {
    if(sideBar.style.width == 0){
        sideBar.classList.add('sidebar-open')
    }
    
})