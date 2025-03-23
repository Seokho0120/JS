const playBtn = document.querySelector(".game-btn");
const itemList = document.querySelector(".game-field");

playBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createItems(10); // 10번 돌아야됨
});

function createItems(count) {
  for (let i = 0; i < count; i++) {
    const item = createItem();

    itemList.appendChild(item);
    console.log("itemList", itemList);
  }
  // const item = createItem();
  // itemList.appendChild(item);
}

function createItem() {
  const itemImage = document.createElement("img");
  itemImage.setAttribute("class", "item-img");

  const random = Math.random(); // 0과 1 사이의 난수를 생성
  if (random < 0.5) {
    itemImage.src = "./img/bug.png"; // 이미지를 직접 설정
    itemImage.alt = "bug";
  } else {
    itemImage.src = "./img/carrot.png"; // 이미지를 직접 설정
    itemImage.alt = "carrot";
  }

  // if (random < 0.5) {
  //   itemImage.innerHTML = `<img src="./img/bug.png" alt="bug" />`;
  // } else {
  //   itemImage.innerHTML = `<img src="./img/carrot.png" alt="carrot" />`;
  // }

  const itemListRect = itemList.getBoundingClientRect();
  console.log("itemListRect", itemListRect);

  // 랜덤 위치 계산 (itemList 내부에만 위치하도록)
  const randomX = Math.random() * (itemListRect.width - 100);
  const randomY = Math.random() * (itemListRect.height - 100);

  console.log("randomX", randomX);
  console.log("randomY", randomY);

  itemImage.style.position = "absolute";
  itemImage.style.left = `${randomX}px`;
  itemImage.style.top = `${randomY}px`;

  // itemImage.style.left = "50px";
  // itemImage.style.right = "100px";

  return itemImage;
}
