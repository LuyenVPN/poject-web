function categoriesList() {
  const categorySelect = document.getElementById("category-select");
  const addSelect = document.getElementById("category");
  const editSelect = document.getElementById("editCategory");

  // Xóa các lựa chọn cũ
  categorySelect.innerHTML = '<option value="all">All Categories</option>';
  addSelect.innerHTML = '<option value="">Select Category</option>';
  editSelect.innerHTML = '<option value="">Select Category</option>';

  // Thêm các tùy chọn từ mảng categories
  categories.forEach((category) => {
    // Tạo và thêm tùy chọn cho categorySelect
    const optionSelect = document.createElement("option");
    optionSelect.value = category.name;
    optionSelect.textContent = category.name;
    categorySelect.appendChild(optionSelect);

    // Tạo và thêm tùy chọn cho thêm
    const optionAdd = document.createElement("option");
    optionAdd.value = category.name;
    optionAdd.textContent = category.name;
    addSelect.appendChild(optionAdd);

    // Tạo và thêm tùy chọn cho sửa lựa chọn
    const optionEdit = document.createElement("option");
    optionEdit.value = category.name;
    optionEdit.textContent = category.name;
    editSelect.appendChild(optionEdit);
  });
}
categoriesList();
let vocabularyList = [];
let indexEddit = null;
let indexDelete = null;
// Thêm biến cho phân trang
let currentPage = 1; // Trang hiện tại
let itemsPerPage = 5; // Số từ vựng hiển thị trên mỗi trang
// Lưu danh sách từ vựng vào localStorage
function saveLocalStorage() {
  localStorage.setItem("vocabularyList", JSON.stringify(vocabularyList));
}

// Tải danh sách từ vựng từ localStorage
function loadLocalStorage() {
  const storyList = localStorage.getItem("vocabularyList");
  if (storyList) {
    vocabularyList = JSON.parse(storyList);
   
  }
}

// Hiển thị danh sách từ vựng
function displayVocabulary(list = vocabularyList) {
  const tableBody = document.getElementById("list-vocabulary");
  tableBody.innerHTML = "";

  list.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.word}</td>
      <td>${item.meaning}</td>
      <td>${item.category}</td>
      <td>
        <button onclick="openEditWordModal(${index})" class="edit-btn">Edit</button>
        <button onclick="openDeleteWordModal(${index})" class="delete-btn">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}


// // Hiển thị danh sách từ vựng
// function displayVocabulary(list = vocabularyList) {
//   const tableBody = document.getElementById("list-vocabulary");
//   tableBody.innerHTML = "";
//   // Tính vị trí bắt đầu và kết thúc của trang hiện tại
//   const start = (currentPage - 1) * itemsPerPage; // Vị trí bắt đầu
//   const end = start + itemsPerPage; // Vị trí kết thúc
//   // Danh sách từ vựng của trang hiện tại
//   const paginatedList = list.slice(start, end);
//   paginatedList.forEach((item, index) => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//           <td>${item.word}</td>
//           <td>${item.meaning}</td>
//           <td>${item.category}</td>
//           <td>
//               <button onclick="openEditWordModal(${start + index})" class="edit-btn">Edit</button>
//               <button onclick="openDeleteWordModal(${start + index})" class="delete-btn">Delete</button>
//           </td>
//       `;
//       tableBody.appendChild(row);
//   });
//   showPagination(list.length);
// }
// Chức năng phân trang
// function showPagination(totalItems) {
//   const paginationDiv = document.getElementById("pagination-controls");
//   paginationDiv.innerHTML = "";
//   if (totalItems === 0) {
//     paginationDiv.style.display = "none";
//     return;
//   }
//   paginationDiv.style.display = "flex";
//   // Tính tổng số trang (làm tròn lên)
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   let buttonsHtml = "";
  
//   // Nút Trang trước
//   if (currentPage > 1) {
//     // Nếu không phải trang đầu, cho phép click
//     buttonsHtml += `<button class="pagination-button" onclick="goToPage(${currentPage - 1})">Trang trước</button>`;
//   } else {
//     // Nếu là trang đầu, không cho click
//     buttonsHtml += `<button class="pagination-button" disabled>Trang trước</button>`;
//   }
//   // Các nút số trang
//   for (let i = 1; i <= totalPages; i++) {
//     if (i === currentPage) {
//       // Trang hiện tại sẽ có màu khác
//       buttonsHtml += `<button class="pagination-button active">${i}</button>`;
//     } else {
//       // Các trang khác có thể click
//       buttonsHtml += `<button class="pagination-button" onclick="goToPage(${i})">${i}</button>`;
//     }
//   }
//   // Nút Trang sau
//   if (currentPage < totalPages) {
//     // Nếu không phải trang cuối, cho phép click
//     buttonsHtml += `<button class="pagination-button" onclick="goToPage(${currentPage + 1})">Trang sau</button>`;
//   } else {
//     // Nếu là trang cuối, không cho click
//     buttonsHtml += `<button class="pagination-button" disabled>Trang sau</button>`;
//   }
//   paginationDiv.innerHTML = buttonsHtml;
// }

// // Hàm chuyển trang đơn giản
// function goToPage(page) {
//   // Đổi trang hiện tại
//   currentPage = page;
//   displayVocabulary();
// }

// Thêm từ mới
function saveWord() {
  const word = document.getElementById("word").value.trim();
  const meaning = document.getElementById("meaning").value.trim();
  const category = document.getElementById("category").value;
  if ( meaning.includes("z") || meaning.includes("Z") ) {
    alert("Lỗi!");
    return;
  }
  if (!word || !meaning || !category) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }
  // for (let i = 0; i < vocabularyList.length; i++) {
  //   if (vocabularyList[i].word.toLowerCase() === word.toLowerCase()) {
  //     alert("Tên từ mới đã tồn tại!");
  //     return;
  //   }
  // } 
  vocabularyList.push({ word, meaning, category });
  // xóa các trường nhập liệu sau khi thêm từ mới
  document.getElementById("word").value = "";
  document.getElementById("meaning").value = "";
  document.getElementById("category").value = "";
  saveLocalStorage();
  displayVocabulary();
  closeAddWordModal();
}

// Sửa từ
function openEditWordModal(index) {
  indexEddit = index;
  const wordNew = vocabularyList[index];
  document.getElementById("editWord").value = wordNew.word;
  document.getElementById("editMeaning").value = wordNew.meaning;
  document.getElementById("editCategory").value = wordNew.category;
  document.getElementById("editWordModal").style.display = "flex";
}

function saveEditedWord() {
  const word = document.getElementById("editWord").value.trim();
  const meaning = document.getElementById("editMeaning").value.trim();
  const category = document.getElementById("editCategory").value;

  if (!word || !meaning || !category || indexEddit === null) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }
  // for (let i = 0; i < vocabularyList.length; i++) {
  //   if (i !== editIndex && vocabularyList[i].word.toLowerCase() === word.toLowerCase()) {
  //     alert("Tên từ mới đã tồn tại!");
  //     return;
  //   }
  // }
  
  vocabularyList[indexEddit] = { word, meaning, category };
  saveLocalStorage();
  displayVocabulary();
  closeEditWordModal();
}

// Xóa từ
function openDeleteWordModal(index) {
  indexDelete = index;
  document.getElementById("deleteWordModal").style.display = "flex";
}

function confirmDeleteWord() {
  if (indexDelete === null) 
  return;

  vocabularyList.splice(indexDelete, 1);
  saveLocalStorage();
  displayVocabulary();
  closeDeleteWordModal();
}

// Tìm kiếm từ
function searchVocabulary() {
  const searchTerm = document.getElementById("search-vocabulary").value.toLowerCase();
  const searchList = vocabularyList.filter((item) =>
    item.word.toLowerCase().includes(searchTerm) ||
    item.meaning.toLowerCase().includes(searchTerm) ||
    item.category.toLowerCase().includes(searchTerm)
  );
  displayVocabulary(searchList);
}
// tìm kiếm theo danh mục
function filterByCategory() {
  const categorySelect = document.getElementById("category-select");
  const selectedCategory = categorySelect.value;
  let result = [];
  if (selectedCategory === "all") {
      result = vocabularyList;
  } 
  else {
      for (let i = 0; i < vocabularyList.length; i++) {
          if (vocabularyList[i].category === selectedCategory) {
              result.push(vocabularyList[i]);
          }
      }
  }
  displayVocabulary(result);
}


// Mở và đóng modal
function openAddWordModal() {
  document.getElementById("addWordModal").style.display = "flex";
}

function closeAddWordModal() {
  document.getElementById("addWordModal").style.display = "none";
  document.getElementById("word").value = "";
  document.getElementById("meaning").value = "";
  document.getElementById("category").value = "";
}

function closeEditWordModal() {
  indexEddit = null;
  document.getElementById("editWordModal").style.display = "none";
}

function closeDeleteWordModal() {
  indexDelete = null;
  document.getElementById("deleteWordModal").style.display = "none";
}

// Khởi tạo
document.addEventListener("DOMContentLoaded", () => {
  loadLocalStorage();
  displayVocabulary();
  document.getElementById("search-vocabulary").addEventListener("input", searchVocabulary);
});
