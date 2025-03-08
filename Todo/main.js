// TODO: https://www.youtube.com/watch?v=OJFwqYrpNU8

const todoInput = document.getElementById('todoInput')
const todoList = document.getElementById('todoList')
const addBtn = document.getElementById('addBtn')

addBtn.addEventListener('click', () =>{
  if(todoInput.value !== '') {
    addTodo()
  } else {
    alert('할일을 추가하세요')
  }
})

todoInput.addEventListener('keydown', (e) =>{
  // 한글 끝부분이 두개씩 입력되는 이슈 해결방법
  if (e.isComposing) return;

  if(e.key === 'Enter' && todoInput.value !== '') {
    addTodo();
  }
})

function addTodo(){
  const li = document.createElement('li')
  li.innerHTML = todoInput.value

  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove-btn');
  removeBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
    </svg>`;

  li.appendChild(removeBtn);
  todoList.appendChild(li);

  todoInput.value = '';
  saveDate();

  // 새로운 todo 추가될때 해당 todo 위치로
  todoList.scrollTop = todoList.scrollHeight;
}

function saveDate() {
  localStorage.setItem('data', todoList.innerHTML)
}

todoList.addEventListener('click', (e) => {
  if (e.target.tagName.toUpperCase() === 'LI') {
    e.target.classList.toggle('checked');
    saveDate();
  } else if (e.target.closest('button')) {
    e.target.closest('li').remove()
    saveDate();
  }
});

// localStorage 데이터 불러오기
function showTodoList() {
  todoList.innerHTML = localStorage.getItem('data') || '';
}
showTodoList()