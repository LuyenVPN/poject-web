// user{
//     id: string,
//     firstName: string,
//     lastName: string,
//     email: string,
//     password: string
//     }

// document.addEventListener("DOMContentLoaded", () => {
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   const exit = document.getElementById("exit");
//   const login = document.getElementById("text-login");
//   const noneMain = document.getElementById("main-none");
//   const name = document.querySelectorAll(".name");
//   const loginNone = document.getElementById("none-nav");

//   if (isLoggedIn && currentUser) {
//     // Hiển thị phần tử khi đăng nhập
//     if (exit) exit.style.display = "flex";
//     if (login) login.style.display = "none";
//     if (noneMain) noneMain.style.display = "block";
//     if (loginNone) loginNone.style.display = "none";

//     // Hiển thị tên người dùng
//     name.forEach((element) => {
//       element.textContent = currentUser.firstName + " " + currentUser.lastName;
//       element.style = "background-color:hsla(0, 0.00%, 99.60%, 0.00)";
//     });
//   } else {
//     // Ẩn phần tử khi chưa đăng nhập
//     if (exit) exit.style.display = "none";
//     if (login) login.style.display = "block";
//     if (noneMain) noneMain.style.display = "none";
//     if (loginNone) loginNone.style.display = "block";
//   }
// });

// // Xử lý đăng xuất
// document.getElementById("exit").onclick = function () {
//   document.getElementById("exitModal").style.display = "flex";
// };

// function closeExitModal() {
//   document.getElementById("exitModal").style.display = "none";
// }

// function confirmExit() {
//   localStorage.removeItem("isLoggedIn");
//   localStorage.removeItem("currentUser");
//   window.location.href = "../html/login.html";
// }
