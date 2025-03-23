const items = document.querySelector(".items");
const input = document.querySelector(".footer_input");
const addBtn = document.querySelector(".footer_button");

function onAdd() {
  // 1. 사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  if (text === "") {
    input.focus();
    return;
  }

  // 2. 새로운 아이템을 만듦 (텍스트 + 삭제버튼)
  const item = createItem(text);

  // 3. items 컨테이너안에 새로 만든 아이템을 추가
  items.appendChild(item);

  // 4. 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({ block: "center" });

  // 5. 인풋을 초기화한다
  input.value = "";
  input.focus();
}
let id = 0; // 간단한 프로젝트니까 id 0으로 설정, 실제 프로젝트는 UUID나 고유id 사용해야함
function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item_row");
  itemRow.setAttribute("data-id", id);
  itemRow.innerHTML = `
          <div class="item">
            <span class="item_name">${text}</span>
            <button class="item_delete">
              <i class="fa-solid fa-trash-can" data-id=${id}></i>
            </button>
          </div>
          <div class="item_divider"></div>`;
  id++;
  return itemRow;
}

addBtn.addEventListener("click", () => {
  onAdd();
});

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    onAdd();
  }
});

// 'i'가 여러개 있을 수 있기 때문에 id 활용
// if (event.target.nodeName === "I") {
items.addEventListener("click", (event) => {
  const id = event.target.dataset.id;

  if (id) {
    const toBeDeleted = document.querySelector(`.item_row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
