// // Learned Words 
// { 
//     userId: string, 
//     wordId: string, 
//     date: string 
//     }
// Thêm vào file flashcard.js
function flipCard() {
    const flashcard = document.querySelector('.flashcard');
    flashcard.classList.toggle('flipped');
  }

  // Cập nhật thanh tiến trình
  function updateProgress(current, total) {
    document.getElementById('progress-count').textContent = `${current}/${total}`;
    const progressFill = document.getElementById('progress-fill');
    const percentage = total > 0 ? (current / total) * 100 : 0;
    progressFill.style.width = `${percentage}%`;
  }