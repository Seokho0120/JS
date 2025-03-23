// 버튼 시작 후 랜덤배치
// 버튼 멈춤 클릭하면 팝업창 뜨고
// 팝업창에 리플레이 버튼 클릭 하면, 전부 초기화 후 재시작됨
// 벌레 클릭하면 게임 짐
// 당근 전부 클릭해서 완료하면 게임 이김

const playBtn = document.querySelector(".game-btn");
const itemList = document.querySelector(".game-field");
const timer = document.querySelector(".game-timer");
const popup = document.querySelector(".popup");
const replayBtn = document.querySelector(".replay-btn");
const messageText = document.querySelector(".message-text");

let isPlay = false;
let remainingTime = 10; // 초기 시간
let countdown = undefined;
let isPopup = false;
let isWin = false;

playBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!isPlay) {
    // 게임시작
    resetItems();
    createItems(20); // 20번 돌아야됨
    playBtn.innerHTML = `<i class="fa-solid fa-stop"></i>`;
    isPlay = true;
    startTimer();
  } else {
    // 게임멈춤
    isPlay = false;
    stopTimer();
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    playBtn.disabled = true;
    showPopup();
  }
});

function startTimer() {
  timer.textContent = remainingTime;

  countdown = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime -= 1;
      timer.textContent = remainingTime;
    } else {
      clearInterval(countdown);
      showResult();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(countdown);
}

function showPopup() {
  popup.classList.add("show");
}

replayBtn.addEventListener("click", () => {
  replayGame();
});

function createItems(count) {
  for (let i = 0; i < count; i++) {
    const item = createItem();
    itemList.appendChild(item);
  }
}

function createItem() {
  const itemImage = document.createElement("img");
  itemImage.setAttribute("class", "item-img");

  const random = Math.random(); // 0과 1 사이의 난수를 생성
  if (random < 0.5) {
    itemImage.src = "./img/bug.png";
    itemImage.alt = "bug";
    itemImage.addEventListener("click", () => {
      console.log("게임졌다");
      isWin = false;
      showResult();
    });
  } else {
    itemImage.src = "./img/carrot.png";
    itemImage.alt = "carrot";
    itemImage.addEventListener("click", () => {
      itemImage.remove();
      checkWin();
    });
  }

  const itemListRect = itemList.getBoundingClientRect();

  // 랜덤 위치 계산 (itemList 내부에만 위치하도록)
  const randomX = Math.random() * (itemListRect.width - 100);
  const randomY = Math.random() * (itemListRect.height - 100);

  itemImage.style.position = "absolute";
  itemImage.style.left = `${randomX}px`;
  itemImage.style.top = `${randomY}px`;

  return itemImage;
}

function resetItems() {
  itemList.innerHTML = "";
  timer.textContent = remainingTime;
  messageText.textContent = "Replay❓"; // 리플레이 메시지 초기화
}

function replayGame() {
  resetItems(); // 아이템 초기화
  playBtn.disabled = false;
  isPlay = true; // 게임 상태 초기화
  remainingTime = 10; // 타이머 초기화
  timer.textContent = remainingTime; // 타이머 표시 초기화
  popup.classList.remove("show"); // 팝업 숨기기
  startTimer(); // 타이머 시작
  playBtn.innerHTML = `<i class="fa-solid fa-stop"></i>`; // 멈춤 아이콘으로 변경
  createItems(20); // 새로운 아이템 생성
}

function checkWin() {
  const remainingCarrot = document.querySelectorAll(
    '.item-img[src="./img/carrot.png"]'
  ).length;

  console.log("남은 당근 갯수", remainingCarrot);
  if (remainingCarrot === 0) {
    console.log("게임 이겼다!");
    isWin = true;
    showResult();

    isPlay = false;
    stopTimer();
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    playBtn.disabled = true;
  }
}

function showResult() {
  if (isWin) {
    messageText.textContent = "You Win🥇"; // 승리 메시지
  } else {
    messageText.textContent = "You Lost😮‍💨"; // 패배 메시지
  }
  showPopup(); // 팝업 표시
}
