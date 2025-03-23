const playBtn = document.querySelector(".play-btn");
const itemList = document.querySelector(".item-list");
const items = [];

// 플레이 버튼 클릭하면 itemList에 item 10개가 생김
// item이 생기면서 위치는 랜덤으로 매번 바뀜
playBtn.addEventListener("click", (e) => {
  e.preventDefault();

  for (let i = 0; i < 10; i++) {
    makeItem(); // 10번 돌아야됨
  }
});

function makeItem() {
  const item = createItem();

  itemList.appendChild(item);
  console.log("itemList", itemList);
}

function createItem() {
  const itemImage = document.createElement("li");
  itemImage.setAttribute("class", "item-img");

  const random = Math.random(); // 0과 1 사이의 난수를 생성
  if (random < 0.5) {
    itemImage.innerHTML = `<img src="./img/bug.png" alt="bug" />`;
  } else {
    itemImage.innerHTML = `<img src="./img/carrot.png" alt="carrot" />`;
  }

  return itemImage;
}
