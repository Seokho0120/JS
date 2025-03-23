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
const carrotCount = document.querySelector(".game-count");
// TODO: carrotCount

let isPlay = false;
let remainingTime = 10; // 초기 시간
let countdown = undefined;
let isWin = false;
let totalCarrots = 0;

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
  timer.textContent = formatTime(remainingTime);

  countdown = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime -= 1;
      timer.textContent = formatTime(remainingTime);
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
      isWin = false;
      stopTimer();
      showResult();
    });
  } else {
    itemImage.src = "./img/carrot.png";
    itemImage.alt = "carrot";
    totalCarrots++;
    carrotCount.textContent = totalCarrots;
    console.log("carrotCount", carrotCount);

    itemImage.addEventListener("click", () => {
      itemImage.remove();
      totalCarrots--;
      carrotCount.textContent = totalCarrots;
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
  timer.textContent = formatTime(remainingTime);
  messageText.textContent = "Replay❓";

  totalCarrots = 0; // 초기화
  carrotCount.textContent = totalCarrots; // UI에 초기 당근 수 표시
}

function replayGame() {
  resetItems(); // 아이템 초기화
  playBtn.disabled = false;
  isPlay = true; // 게임 상태 초기화
  remainingTime = 10; // 타이머 초기화
  timer.textContent = formatTime(remainingTime);
  popup.classList.remove("show");

  startTimer();
  playBtn.innerHTML = `<i class="fa-solid fa-stop"></i>`; // 멈춤 아이콘으로 변경
  createItems(20);
}

function formatTime(timeInSeconds) {
  const seconds = String(timeInSeconds % 60).padStart(2, "0");
  return `00:${seconds}`; // "MM:SS" 형식으로 변경
}

function checkWin() {
  const remainingCarrot = document.querySelectorAll(
    '.item-img[src="./img/carrot.png"]'
  ).length;

  // console.log("남은 당근 갯수", remainingCarrot);
  // if (remainingCarrot === 0) {
  if (totalCarrots === 0) {
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
    messageText.textContent = "You Win🥇";
  } else {
    messageText.textContent = "You Lost😮‍💨";
  }
  showPopup();
}
