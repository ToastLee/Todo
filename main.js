const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn');

let todos = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
  const item = {
    id: new Date().getTime(), 
    text: '', 
    complete: false
  }

  //배열 처음에 새로운 아이템을 추가
  todos.unshift(item);

  //요소 생성하기
  const {itemEl, inputEl, editBtnEl,removeBtnEl} = createTodoElement(item);

  //리스트 요소 안에 방금 생성한 아이템 요소 추가
  list.prepend(itemEl);
  
  //바로 생성한 리스트 편집가능하게
  inputEl.removeAttribute('disabled');

  inputEl.focus();
  //생성후 로컬스토리지에 추가
  saveToLocalStorage();
}

//todo에 해당하는 요소 만들기 
function createTodoElement(item) {
  const itemEl = document.createElement('div');
  itemEl.classList.add('item');

  const checkboxEl = document.createElement('input');
  checkboxEl.type = 'checkbox';
  //체크 상태는 아이템이 완성되었다는 상태
  checkboxEl.checked = item.complete;

  if(item.complete) {
    itemEl.classList.add('complete');
  }
  //todo 추가시 각각의 요소 추가하기

  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.value = item.text;
  inputEl.setAttribute('disabled', '');

  const actionsEl = document.createElement('div');
  actionsEl.classList.add('actions');

  const editBtnEl = document.createElement('button');
  editBtnEl.classList.add('material-icons');
  editBtnEl.innerText = ' edit';

  const removeBtnEl = document.createElement('button');
  removeBtnEl.classList.add('material-icons', 'remove-btn');
  removeBtnEl.innerText = ' remove_circles';
  
  //체크시 내용에 줄 긋기
  checkboxEl.addEventListener('change', () => {
    item.complete = checkboxEl.checked;

    if(item.complete) {
      itemEl.classList.add('complete');
    } else {
      itemEl.classList.remove('complete');
    }
    //체크 후 데이터에 저장
    saveToLocalStorage();
  })

  //포커스가 벗어나 blur가 생기면 내용 수정 막기
  inputEl.addEventListener('blur', () =>  {
    inputEl.setAttribute('disabled', '');
    //blur가 될 때도 데이터 저장
    saveToLocalStorage();
  })

  //새로 생성시 내용 추가하기
  inputEl.addEventListener('input', () => { 
    item.text = inputEl.value
  })
  
  //수정 버튼 누르면 내용 수정이 가능하고 포커스 하기 
  editBtnEl.addEventListener('click', () => {
    inputEl.removeAttribute('disabled');
    inputEl.focus();
  })
  
  //지움 버튼 누르면 해당 지우기
  removeBtnEl.addEventListener('click', () => {
    //todos 배열에서 item 객체의 id속성 값과 다른 값을 가진 id 요소들만 남기고 나머지 제거 
    todos = todos.filter(t => t.id !== item.id)
    //todos 요소 없애기
    itemEl.remove();
    //remove되고 나서도 데이터 지우기 
    saveToLocalStorage();
  });
  
  //actionEl에 정의된 요소 추가하기
  actionsEl.append(editBtnEl);
  actionsEl.append(removeBtnEl);

  itemEl.append(checkboxEl);
  itemEl.append(inputEl);
  itemEl.append(actionsEl);

  return { itemEl, inputEl, editBtnEl, removeBtnEl};
}

// todo 데이터를 로컬 데이터에 저장하여 휘발되지 않게 하기
function saveToLocalStorage() {
  const data = JSON.stringify(todos);
  //key, value
  localStorage.setItem('my_todos', data);
}

//저장된 로컬 데이터 불러오기
function loadFromLocalStorage() {
  const data = localStorage.getItem('my_todos');

  if(data) {
    //JSON String을 Object로 변환
    todos = JSON.parse(data);
  }
}

function displayTodos() {
  loadFromLocalStorage();

    //todos 배열 객체 수 만큼 순회하기 
    for(let i = 0; i < todos.length; i++) {
      const item = array[i];
        const { itemEl } = createTodoElement(item);

        list.append(itemEl);
    }

}

displayTodos();