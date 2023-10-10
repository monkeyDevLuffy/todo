const openModalButtons=document.querySelectorAll('[data-modal-target]');
const closeModalButtons=document.querySelectorAll('[data-modal-close]');
const openMusicModalButtons=document.querySelectorAll('[data-music-modal-target]');
const closeMusicModalButtons=document.querySelectorAll('[data-music-modal-close]');
const overlay=document.getElementById('overlay');

openModalButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        const modal = document.getElementById('modal');
        openModal(modal);
    })
})
closeModalButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        const modal = document.getElementById('modal');
        closeModal(modal);
    })
})

openMusicModalButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        const music_modal = document.getElementById('music-modal');
        openModal(music_modal);
    })
})
closeMusicModalButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        const music_modal = document.getElementById('music-modal');
        closeModal(music_modal);
    })
})

function openModal(modal){
    if(modal==null) return null;
    modal.classList.add('active');
    overlay.classList.add('active');
}   
function closeModal(modal){
    if(modal==null) return null;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}   
