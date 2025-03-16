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
// console.log("noteList >>>> ", noteList);

addBox.addEventListener("click", () => {
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  popupBox.classList.remove("show");
});

function getNoteList() {
  noteList.forEach((note) => {
    console.log("note", note);
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
                        <i class="fa-solid fa-ellipsis"></i>
                        <ul class="menu">
                          <li>
                            <i class="fa-solid fa-pen"></i>
                            Edit
                          </li>
                          <li>
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

    console.log("formattedTime", formattedTime);

    const noteForm = {
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day}, ${year} ${formattedTime}`,
    };

    // const noteList = [];
    noteList.push(noteForm);
    localStorage.setItem("noteList", JSON.stringify(noteList));
    closeIcon.click();
  }
});
