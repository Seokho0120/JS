// 버튼 시작 후 랜덤배치
// 버튼 멈춤 클릭하면 팝업창 뜨고
// 팝업창에 리플레이 버튼 클릭 하면, 전부 초기화 후 재시작됨
// 벌레 클릭하면 게임 짐
// 당근 전부 클릭해서 완료하면 게임 이김

const playBtn = document.querySelector(".game-btn");
const itemList = document.querySelector(".game-field");
const timer = document.querySelector(".game-timer");

let isPlay = false;
let remainingTime = 10; // 초기 시간
let countdown = undefined;

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
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    isPlay = false;
    stopTimer();
  }
});

function startTimer() {
  console.log("시작");

  timer.textContent = remainingTime;

  countdown = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime -= 1;
      timer.textContent = remainingTime;
    } else {
      clearInterval(countdown);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(countdown);
}

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
  } else {
    itemImage.src = "./img/carrot.png";
    itemImage.alt = "carrot";
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
}
