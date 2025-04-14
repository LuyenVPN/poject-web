// Xóa tất cả thông báo lỗi
function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((error) => error.remove());
}

// Hiển thị thông báo lỗi cho trường input
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.style.color = "red";
  errorDiv.style.fontSize = "12px";
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

// Kiểm tra định dạng email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Kiểm tra điều kiện mật khẩu:
function validatePassword(password) {
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  return true;
}

// Kiểm tra email đã được đăng ký chưa
function isEmailRegistered(email) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.some((user) => user.email === email);
}

// Xử lý form đăng ký
function handleRegister(event) {
  event.preventDefault();
  clearErrors();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  let isValid = true;
  if (!firstName) {
    showError("firstName", "Vui lòng nhập họ");
    isValid = false;
  }
  if (!lastName) {
    showError("lastName", "Vui lòng nhập tên");
    isValid = false;
  }

  if (!validateEmail(email)) {
    showError("email", "Email không đúng định dạng");
    isValid = false;
  } else if (isEmailRegistered(email)) {
    showError("email", "Email này đã được đăng ký");
    isValid = false;
  }

  if (!validatePassword(password)) {
    showError(
      "password",
      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số"
    );
    isValid = false;
  }

  if (password !== confirmPassword) {
    showError("confirmPassword", "Mật khẩu xác nhận không khớp");
    isValid = false;
  }

  if (isValid) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ firstName, lastName, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công!");
    window.location.href = "./login.html";
  }
}

// Xử lý form đăng nhập
function handleLogin(event) {
  event.preventDefault();
  clearErrors();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  let isValid = true;

  if (!validateEmail(email)) {
    showError("loginEmail", "Email không hợp lệ");
    isValid = false;
  }

  if (!validatePassword(password)) {
    showError(
      "loginPassword",
      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số"
    );
    isValid = false;
  }

  if (isValid) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true"); //kiểm tra xem đã đăng nhập hay chưa
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "../html/dashboard.html";
    } else {
      showError("loginEmail", "Email hoặc mật khẩu không đúng");
      showError("loginPassword", "Email hoặc mật khẩu không đúng");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector(".registerForm");
  const loginForm = document.querySelector(".loginForm");

  if (registerForm) registerForm.addEventListener("submit", handleRegister);
  if (loginForm) loginForm.addEventListener("submit", handleLogin);
});
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const exit = document.getElementById("exit");
  const login = document.getElementById("text-login");
  const noneMain = document.getElementById("main-none");
  const name = document.querySelectorAll(".name");
  const loginNone = document.getElementById("none-nav");

  if (isLoggedIn && currentUser) {
    // Hiển thị phần tử khi đăng nhập
    if (exit) exit.style.display = "flex";
    if (login) login.style.display = "none";
    if (noneMain) noneMain.style.display = "block";
    if (loginNone) loginNone.style.display = "none";

    // Hiển thị tên người dùng
    name.forEach((element) => {
      element.textContent = currentUser.firstName + " " + currentUser.lastName;
      element.style = "background-color:hsla(0, 0.00%, 99.60%, 0.00)";
    });
  } else {
    // Ẩn phần tử khi chưa đăng nhập
    if (exit) exit.style.display = "none";
    if (login) login.style.display = "block";
    if (noneMain) noneMain.style.display = "none";
    if (loginNone) loginNone.style.display = "block";
  }
});

// Xử lý đăng xuất
document.getElementById("exit").onclick = function () {
  document.getElementById("exitModal").style.display = "flex";
};

function closeExitModal() {
  document.getElementById("exitModal").style.display = "none";
}

function confirmExit() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "../html/login.html";
}
