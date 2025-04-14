function categoriesList() {
  const categorySelect = document.getElementById("categorySelect");
  categorySelect.innerHTML = '<option value="all">All Categories</option>';

  // Thêm các tùy chọn từ mảng categories
  categories.forEach((category) => {
    const optionSelect = document.createElement("option");
    optionSelect.value = category.name;
    optionSelect.textContent = category.name;
    categorySelect.appendChild(optionSelect);
  });
  // Thêm các tùy chọn
  const fixedOptions = [
    { value: "learned", text: "Learned" },
    { value: "not-learned", text: "Not Learned" },
  ];

  fixedOptions.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.text;
    categorySelect.appendChild(option);
  });
}

categoriesList();
let currentCardIndex = 0; // Chỉ số thẻ hiện tại
let isFlipped = false; // Trạng thái lật thẻ
let flashcardList = []; // Danh sách flashcard
let filteredFlashcardList = []; // Danh sách flashcard đã lọc
const progressText = document.getElementById("progress-count");
const progressBar = document.getElementById("progress-fill");

// Hàm lật thẻ
function flipCard() {
  const flashcard = document.querySelector(".flashcard");
  flashcard.classList.toggle("flipped");
  document.getElementById("display").style = "display: none";
  isFlipped = !isFlipped;
}

// Hàm tải danh sách từ vựng từ localStorage
function loadFromLocalStorage() {
  const storedList = localStorage.getItem("vocabularyList");
  if (storedList) {
    flashcardList = JSON.parse(storedList);
    filteredFlashcardList = flashcardList; // Mặc định hiển thị toàn bộ danh sách
  } else {
    flashcardList = [];
    filteredFlashcardList = [];
  }
}

// Hàm lưu danh sách flashcard vào localStorage
function saveToLocalStorage() {
  localStorage.setItem("vocabularyList", JSON.stringify(flashcardList));
}

// Hàm hiển thị danh sách từ vựng trong bảng
function display(list = filteredFlashcardList) {
  const table = document.getElementById("word-list-body");
  table.innerHTML = "";
  list.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.word}</td>
      <td>${item.meaning}</td>
      <td>
        <span style="color: ${item.learned ? "green" : "red"};">
          ${item.learned ? "Learned" : "Not Learned"}
        </span>
      </td>
    `;
    table.appendChild(row);
  });
}

// Hàm tìm kiếm theo danh mục
function filterflashCard() {
  const select = document.getElementById("categorySelect");
  const selected = select.value;

  if (selected === "all") {
    filteredFlashcardList = flashcardList;
  } else if (selected === "learned") {
    filteredFlashcardList = flashcardList.filter(
      (item) => item.learned === true
    );
  } else if (selected === "not-learned") {
    filteredFlashcardList = flashcardList.filter((item) => !item.learned);
  } else {
    filteredFlashcardList = flashcardList.filter(
      (item) => item.category === selected
    );
  }
  initializeFlashcards();
  display(filteredFlashcardList);
}

// Hàm khởi tạo flashcard
function initializeFlashcards() {
  if (filteredFlashcardList.length === 0) {
    document.getElementById("flashcard-content").textContent =
      "No words available";
    document.getElementById("flashcard-meaning").textContent =
      "Add some words to get started";
    progressText.textContent = `0/0`;
    progressBar.style.width = `0%`;
    document.getElementById("display").style = "display: none";
    return;
  }

  currentCardIndex = 0;
  displayCurrentCard();
  updateProgress();
}

// Hàm hiển thị thẻ hiện tại
function displayCurrentCard() {
  const currentWord = filteredFlashcardList[currentCardIndex];
  if (currentWord) {
    document.getElementById("flashcard-content").textContent = currentWord.word;
    document.getElementById("flashcard-meaning").textContent =
      currentWord.meaning;
  }
}
// Hàm chuyển sang thẻ tiếp theo
function nextCard() {
  if (currentCardIndex < filteredFlashcardList.length - 1) {
    currentCardIndex++;
    document.getElementById("display").style = "display: none";
    isFlipped = false;
    document.querySelector(".flashcard").classList.remove("flipped");
    displayCurrentCard();
    updateProgress();
  }
}

// Hàm quay lại thẻ trước
function previousCard() {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    document.getElementById("display").style = "display: none";
    isFlipped = false;
    document.querySelector(".flashcard").classList.remove("flipped");
    displayCurrentCard();
    updateProgress();
  }
}

// Hàm đánh dấu từ đã học
function markAsLearned() {
  if (!isFlipped) {
    document.getElementById("display").style = "display: block";
    return;
  }
  if (filteredFlashcardList[currentCardIndex]) {
    filteredFlashcardList[currentCardIndex].learned = true; // Đánh dấu từ hiện tại là đã học
    saveToLocalStorage();
    display();
    nextCard();
    o;
  }
}

// Hàm cập nhật tiến trình
function updateProgress() {
  progressText.textContent = `${currentCardIndex + 1}/${
    filteredFlashcardList.length
  }`;
  const progressPercentage =
    ((currentCardIndex + 1) / filteredFlashcardList.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  initializeFlashcards();
  display();
  document
    .getElementById("prev-button")
    .addEventListener("click", previousCard);

  document.getElementById("next-button").addEventListener("click", nextCard);

  document
    .getElementById("mark-learned-button")
    .addEventListener("click", markAsLearned);
});
