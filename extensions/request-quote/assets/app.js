const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalContainer = document.getElementById('modalContainer');
const saveButton = document.getElementById('saveButton');
const shopOrigin = Shopify.shopOrigin || window.location.host || '';

openModalBtn.addEventListener('click', () => {
  modalContainer.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
  modalContainer.style.display = 'none';
});

fetch('vify_rfq-f')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error occurred during the request.');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });

saveButton.addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.getElementById('nameInput');
  const email = document.getElementById('emailInput');
  const message = document.getElementById('messageInput').value;
  const data = {
    name,
    email,
    message,
  };

  console.log(data);

  fetch(`${shopOrigin}/vify_rfq-f/new_quote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => {
      // Xử lý kết quả sau khi gửi dữ liệu thành công
      console.log(result);
    })
    .catch(error => {
      // Xử lý lỗi nếu có
      console.error(error);
    });
});