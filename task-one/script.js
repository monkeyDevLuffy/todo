const openModalButtons=document.querySelectorAll('[data-modal-target]');
const closeModalButtons=document.querySelectorAll('[data-modal-close]');
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