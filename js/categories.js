let categories = [];
let currentPage = 1; // Trang hiện tại
const itemsPerPage = 5; // Số danh mục hiển thị trên mỗi trang

if (localStorage.getItem("categories")) {
  categories = JSON.parse(localStorage.getItem("categories"));
}
// Gán mảng categories vào window lấy dữ liệu cho các file khác
window.categories = categories;

function displayCategories() {
  const tbody = document.getElementById("list-category");
  tbody.innerHTML = "";

  // Tính vị trí bắt đầu và kết thúc của trang hiện tại
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  // Danh sách danh mục của trang hiện tại
  const paginatedCategories = categories.slice(start, end);

  // Hiển thị danh sách danh mục
  paginatedCategories.forEach((category, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${category.name}</td>
      <td>${category.description}</td>
      <td>
        <button class="edit-btn" onclick="openEditCategoryModal(${
          start + index
        })">Edit</button>
        <button class="delete-btn" onclick="openDeleteCategoryModal(${
          start + index
        })">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  // Hiển thị các nút phân trang
  showPagination(categories.length);
}
function showPagination(totalItems) {
  const paginationDiv = document.getElementById("pagination-controls");
  paginationDiv.innerHTML = "";

  if (totalItems === 0) {
    paginationDiv.style.display = "none";
    return;
  }

  paginationDiv.style.display = "flex";

  // Tính tổng số trang
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let buttonsHtml = "";

  // Nút Trang trước
  if (currentPage > 1) {
    buttonsHtml += `<button class="pagination-button" onclick="goToPage(${
      currentPage - 1
    })">Trang Trước</button>`;
  } else {
    buttonsHtml += `<button class="pagination-button" disabled>Trang Trước</button>`;
  }

  // Các nút số trang
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      buttonsHtml += `<button class="pagination-button active">${i}</button>`;
    } else {
      buttonsHtml += `<button class="pagination-button" onclick="goToPage(${i})">${i}</button>`;
    }
  }

  // Nút Trang sau
  if (currentPage < totalPages) {
    buttonsHtml += `<button class="pagination-button" onclick="goToPage(${
      currentPage + 1
    })">Trang Sau</button>`;
  } else {
    buttonsHtml += `<button class="pagination-button" disabled>Trang Sau</button>`;
  }

  paginationDiv.innerHTML = buttonsHtml;
}
function goToPage(page) {
  currentPage = page;
  displayCategories();
}

// Các hàm xử lý modal thêm mới
function openAddCategoryModal() {
  document.getElementById("addCategoryModal").style.display = "flex";
}

function closeAddCategoryModal() {
  document.getElementById("addCategoryModal").style.display = "none";
  document.getElementById("newCategoryName").value = "";
  document.getElementById("newCategoryDescription").value = "";
}

function saveNewCategory() {
  const name = document.getElementById("newCategoryName").value.trim();
  const description = document
    .getElementById("newCategoryDescription")
    .value.trim();

  if (!name || !description) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  // Kiểm tra trùng tên
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].name.toLowerCase() === name.toLowerCase()) {
      alert("Tên danh mục đã tồn tại!");
      return;
    }
  }

  categories.push({
    name: name,
    description: description,
  });

  localStorage.setItem("categories", JSON.stringify(categories));
  displayCategories();
  closeAddCategoryModal();
}

// Các hàm xử lý modal sửa
let editIndex = -1;

function openEditCategoryModal(index) {
  editIndex = index;
  const category = categories[index];

  document.getElementById("editCategoryName").value = category.name;
  document.getElementById("editCategoryDescription").value =
    category.description;
  document.getElementById("editCategoryModal").style.display = "flex";
}

function closeEditCategoryModal() {
  document.getElementById("editCategoryModal").style.display = "none";
}

function saveEditedCategory() {
  const name = document.getElementById("editCategoryName").value.trim();
  const description = document
    .getElementById("editCategoryDescription")
    .value.trim();

  if (!name || !description) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  // Kiểm tra trùng tên với các danh mục khác
  for (let i = 0; i < categories.length; i++) {
    // Bỏ qua danh mục đang chỉnh sửa (index === editIndex)
    if (
      i !== editIndex &&
      categories[i].name.toLowerCase() === name.toLowerCase()
    ) {
      alert("Tên danh mục đã tồn tại!");
      return;
    }
  }

  categories[editIndex] = {
    name: name,
    description: description,
  };

  localStorage.setItem("categories", JSON.stringify(categories));
  displayCategories();
  closeEditCategoryModal();
}

// Các hàm xử lý modal xóa
let deleteIndex = -1;

function openDeleteCategoryModal(index) {
  deleteIndex = index;
  document.getElementById("deleteCategoryModal").style.display = "flex";
}

function closeDeleteCategoryModal() {
  document.getElementById("deleteCategoryModal").style.display = "none";
}

function confirmDeleteCategory() {
  categories.splice(deleteIndex, 1);
  localStorage.setItem("categories", JSON.stringify(categories));
  displayCategories();
  closeDeleteCategoryModal();
}

// Hàm tìm kiếm
function searchCategories() {
  const searchText = document.getElementById("search").value.toLowerCase();
  const tbody = document.getElementById("list-category");
  tbody.innerHTML = "";

  categories
    .filter(
      (category) =>
        category.name.toLowerCase().includes(searchText) ||
        category.description.toLowerCase().includes(searchText)
    )
    .forEach((category, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${category.name}</td>
      <td>${category.description}</td>
      <td>
        <button class="edit-btn" onclick="openEditCategoryModal(${index})">Edit</button>
        <button class="delete-btn" onclick="openDeleteCategoryModal(${index})">Delete</button>
      </td>
    `;
      tbody.appendChild(row);
    });
}

const searchInput = document.getElementById("search");
searchInput.oninput = searchCategories;
displayCategories();
