const currentTask = document.querySelector('#texto-tarefa');
const addTaskButton = document.querySelector('#criar-tarefa');
const olList = document.querySelector('#lista-tarefas');
let completedTask = 0;

// Retorna o texto do input
const getTaskText = () => document.querySelector('#texto-tarefa').value;

// Retorna a lista atualizada ol pai
const getListElements = () => document.querySelectorAll('.task');

// Limpa o campo do input
const clearInputText = () => {
  currentTask.value = '';
};

// Remove a class selected do elemento
const removeClassSelected = () => {
  const list = getListElements();
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].classList.contains('selected')) {
      list[i].classList.remove('selected');
      list[i].style.background = '#FFF';
    }
  }
};

// Muda o background color do elemento selecionado, se possuir a classe selected.
const changeBackgroundColor = (event) => {
  const elemento = event;
  removeClassSelected();
  elemento.target.classList.add('selected');
  elemento.target.style.background = 'gray';
};

const isCompleted = (event) => {
  const elementEvent = event.target;
  switch (completedTask) {
  case 1:
    elementEvent.style.textDecoration = 'line-through';
    break;
  case 2:
    elementEvent.style.textDecoration = 'none';
    console.log('passou aqui');
    completedTask = 0;
    break;
  default:
    completedTask += 1;
  }
};
// Adiciona Listener aos elementos criados
const addListenerTask = (task) => {
  task.addEventListener('click', changeBackgroundColor);
  task.addEventListener('click', isCompleted);
};

// Adiciona a tarefa criada na lista
const addTaskToList = () => {
  const taskItem = document.createElement('li');
  taskItem.innerText = getTaskText();
  taskItem.classList.add('task');
  addListenerTask(taskItem);
  olList.appendChild(taskItem);
  clearInputText();
};

addTaskButton.addEventListener('click', addTaskToList);
currentTask.addEventListener('change', getTaskText);
