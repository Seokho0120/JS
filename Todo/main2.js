// TODO: https://www.youtube.com/watch?v=OJFwqYrpNU8

const todoInput = document.getElementById('todoInput')
const todoList = document.getElementById('todoList')
const addBtn = document.getElementById('addBtn')
// const newBtn = document.createElement('button'); 

addBtn.addEventListener('click', () =>{
  if(todoInput.value !== '') {
    addTodo()
  } else {
    alert('할일을 추가하세요')
  }
})

addEventListener('keydown', (e) =>{
  if(e.key === 'Enter') {
    addTodo()
  }
})

function addTodo(){
  const li = document.createElement('li')
  li.innerHTML = todoInput.value

  const span = document.createElement('span');
  span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
          </svg>`

  li.appendChild(span)
  todoList.appendChild(li)

  todoInput.value = '';
  saveDate()
}

function saveDate() {
  localStorage.setItem('data', todoList.innerHTML)
}

todoList.addEventListener('click', (e) =>{
  console.log('e.target',e.target.parentElement.parentElement)
  if(e.target.tagName.toUpperCase() === 'LI') {
    e.target.classList.toggle('checked')
    saveDate()
  } else if (e.target.tagName.toUpperCase() === 'SVG') {
    e.target.closest('li').remove()
    // e.target.parentElement.parentElement.remove()
    saveDate()
  }
})

function showTodoList() {
  todoList.innerHTML = localStorage.getItem('data')
}
showTodoList()