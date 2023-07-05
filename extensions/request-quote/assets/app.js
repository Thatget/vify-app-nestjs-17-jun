const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalContainer = document.getElementById('modalContainer');

openModalBtn.addEventListener('click', () => {
  modalContainer.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
  modalContainer.style.display = 'none';
});
