const addBtn = document.querySelector('#addBtn')

function keyCodeCheck() {
  if(window.event.keyCode === 13 && todoInput.value !== ''){
    createTodo()
  }
}

addBtn.addEventListener('click', () => {
  if(todoInput.value !== '') {
    console.log('input value -->',todoInput.value)
    createTodo()
  }
})

function createTodo() {
  const todoList = document.querySelector('#todoList')
  const newLi = document.createElement('li')
  const newBtn = document.createElement('button'); 
  const newSpan = document.createElement('span');
  const todoInput = document.querySelector('#todoInput')

  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  console.log('newLi',newLi)

  newSpan.textContent = todoInput.value;

  todoList.appendChild(newLi);

  todoInput.value = '';

  newBtn.addEventListener('click', () => {
    
  })
}

