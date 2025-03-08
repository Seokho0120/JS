// const addBtn = document.querySelector('#addBtn')
// addBtn.addEventListener('click', () => {
//   // items 배열에 value를 넣어주면됨
//   if(todoInput.value !== '') {
//     keyCodeCheck()
//   }
// })

function keyCodeCheck() {
  // console.log(window.event.keyCode)
  if(window.event.keyCode === 13 && todoInput.value !== '') {
    const todoList = document.querySelector('#todoList')
    const newLi = document.createElement('li')
    const newBtn = document.createElement('button'); 
    const newSpan = document.createElement('span');
    const todoInput = document.querySelector('#todoInput')

    newLi.appendChild(newBtn);
    newLi.appendChild(newSpan);
    console.log('newLi', newLi);

    newSpan.textContent = todoInput.value;

    todoList.appendChild(newLi);

    todoInput.value = '';
  }
}

