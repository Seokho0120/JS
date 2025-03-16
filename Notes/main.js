const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const closeIcon = popupBox.querySelector("header i");
const addBtn = popupBox.querySelector("button");
const titleTag = popupBox.querySelector("input");
const descTag = popupBox.querySelector("textarea");
// const popupTitle = popupBox.querySelector("header p")

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

addBox.addEventListener("click", () => {
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  titleTag.value = "";
  descTag.value = "";
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
                          <li>
                            <i class="fa-solid fa-pen"></i>
                            Edit
                          </li>
                          <li onclick="deleteNote(${index})" >
                            <i class="fa-solid fa-trash"></i>
                            Delete
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                `;

    addBox.insertAdjacentHTML("afterend", liTag);
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

function deleteNote(noteId) {
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

    noteList.push(noteForm);
    localStorage.setItem("noteList", JSON.stringify(noteList));
    closeIcon.click();
    getNoteList();
  }
});
