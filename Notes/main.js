// TODO: https://www.youtube.com/watch?v=AkIUtUWpyZs 참고

const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = popupBox.querySelector("header p");

const closeIcon = popupBox.querySelector("header i");
const addBtn = popupBox.querySelector("button");
const titleTag = popupBox.querySelector("input");
const descTag = popupBox.querySelector("textarea");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const noteList = JSON.parse(localStorage.getItem("noteList")) || [];
let isEdit = false;
let updateId = null;

// const editState = {
//   isEdit: false,
//   updateId: null,
// }; // 객체로 상태 관리

addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isEdit = false;
  // editState.isEdit = false;
  titleTag.value = "";
  descTag.value = "";

  addBtn.innerText = "Add Note";
  popupTitle.innerHTML = "Add a new Note";

  popupBox.classList.remove("show");
});

function getNoteList() {
  document.querySelectorAll(".note").forEach((note) => note.remove()); // TODO: 왜?
  noteList.forEach((note, index) => {
    const liTag = `<li class="note">
                    <div class="details">
                      <p>${note.title}</p>
                      <span>
                      ${note.description}
                      </span>
                    </div>
                    <div class="bottom-content">
                      <span>${note.date}</span>
                      <div class="settings">
                        <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                        <ul class="menu">
                          <li onclick="editNote(${index}, '${note.title}', '${note.description}')">
                            <i class="fa-solid fa-pen"></i>
                            Edit
                          </li>
                          <li onclick="deleteNote(${index})">
                            <i class="fa-solid fa-trash"></i>
                            Delete
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                `;

    addBox.insertAdjacentHTML("afterend", liTag);
    // https://sunshineyellow.tistory.com/94#element-insertAdjacentHTML-position%-C%--text-
    // insertAdjacentHTML, appendChild 내용 참고하기
  });
}
getNoteList();

function showMenu(el) {
  el.parentElement.classList.add("show");

  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != el) {
      el.parentElement.classList.remove("show");
    }
  });
}

function editNote(noteId, title, desc) {
  isEdit = true;
  updateId = noteId;

  // editState.isEdit = true;
  // editState.updateId = noteId;

  addBox.click();

  titleTag.value = title;
  descTag.value = desc;

  addBtn.innerText = "Edit Note";
  popupTitle.innerHTML = "Edit a Note";
}

function deleteNote(noteId) {
  const confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;

  noteList.splice(noteId, 1); // 삭제
  localStorage.setItem("noteList", JSON.stringify(noteList)); // 로컬스토리지에 저장
  getNoteList(); // 삭제하고 로컬스토리지에 있는거 보여주기
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const noteTitle = titleTag.value;
  const noteDesc = descTag.value;

  if (noteTitle || noteDesc) {
    const dateObj = new Date();
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    const noteForm = {
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day}, ${year} ${formattedTime}`,
    };

    if (!isEdit) {
      noteList.push(noteForm); // 새로운 노트 추가
    } else {
      isEdit = false;
      noteList[updateId] = noteForm; // 특정 아이디에 노트 업데이트
    }

    // if (!editState.isEdit) {
    //   noteList.push(noteForm); // 새로운 노트 추가
    // } else {
    //   noteList[editState.updateId] = noteForm; // 특정 아이디에 노트 업데이트
    //   editState.isEdit = false;
    // }

    localStorage.setItem("noteList", JSON.stringify(noteList));
    closeIcon.click();
    getNoteList();
  }
});
