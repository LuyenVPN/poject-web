let categories = [];


if (localStorage.getItem("categories")) {
  categories = JSON.parse(localStorage.getItem("categories"));
}
// Gán mảng categories vào window lấy dữ liệu cho các file khác
window.categories = categories;

// Hàm hiển thị danh sách danh mục
function displayCategories() {
  // Lấy phần tbody của bảng
  const tbody = document.getElementById("list-category");
  
  // Xóa hết nội dung cũ
  tbody.innerHTML = "";

  // Duyệt qua từng danh mục để hiển thị
  categories.forEach((category, index) => {
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
  const description = document.getElementById("newCategoryDescription").value.trim();

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
    description: description
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
  document.getElementById("editCategoryDescription").value = category.description;
  document.getElementById("editCategoryModal").style.display = "flex";
}

function closeEditCategoryModal() {
  document.getElementById("editCategoryModal").style.display = "none";
}

function saveEditedCategory() {
  const name = document.getElementById("editCategoryName").value.trim();
  const description = document.getElementById("editCategoryDescription").value.trim();

  if (!name || !description) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

// Kiểm tra trùng tên với các danh mục khác
for (let i = 0; i < categories.length; i++) {
    // Bỏ qua danh mục đang chỉnh sửa (index === editIndex)
    if (i !== editIndex && categories[i].name.toLowerCase() === name.toLowerCase()) {
      alert("Tên danh mục đã tồn tại!");
      return;
    }
  }

  categories[editIndex] = {
    name: name,
    description: description
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

  categories.filter(category => 
    category.name.toLowerCase().includes(searchText) || 
    category.description.toLowerCase().includes(searchText)
  ).forEach((category, index) => {
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

// Thêm sự kiện tìm kiếm
// document.getElementById("search").addEventListener("input", searchCategories);
//Cách 2: onciput
const searchInput = document.getElementById("search");
searchInput.oninput = searchCategories;

// Hiển thị danh sách khi trang được tải
displayCategories();