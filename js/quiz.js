function categoriesList() {
  const categorySelect = document.getElementById("category-quiz");

  // Xóa các lựa chọn cũ
  categorySelect.innerHTML = '<option value="all">All Categories</option>';
  // Thêm các tùy chọn từ mảng categories
  categories.forEach((category) => {
    // Tạo và thêm tùy chọn cho categorySelect
    const optionSelect = document.createElement("option");
    optionSelect.value = category.name;
    optionSelect.textContent = category.name;
    categorySelect.appendChild(optionSelect);
  });
}
categoriesList();

let selectedAnswer = null;
let found = false;

function startQuiz() {
  document.getElementById("quiz").style = "display: block";
  document.getElementById("resultQuiz").style = "display: none";
  document.getElementById("answer1").style = "background-color: white";
  document.getElementById("answer2").style = "background-color: white";
  selectedAnswer = null;
  found = false;
}

function yes() {
  if (found) return;
  document.getElementById("answer1").style =
    "background-color: rgb(220 252 231)";
  document.getElementById("answer2").style = "background-color: white";
  selectedAnswer = "yes";
  found = true;
}

function no() {
  if (found) return;
  document.getElementById("answer1").style =
    "background-color: rgb(220 252 231)";
  document.getElementById("answer2").style = "background-color: #fee2e2";
  selectedAnswer = "no";
  found = true;
}

function nextQuestion() {
  document.getElementById("quiz").style = "display: none";
  document.getElementById("resultQuiz").style = "display: block";

  if (selectedAnswer === "yes") {
    document.getElementById("finalScore").textContent = "100%";
    document.getElementById("scoreMessage").textContent =
      "Bạn trả lời đúng 1 trong số 1 câu hỏi";
  } else {
    document.getElementById("finalScore").textContent = "0%";
    document.getElementById("scoreMessage").textContent =
      "Bạn trả lời đúng 0 trong số 1 câu hỏi";
  }
}
