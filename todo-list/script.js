const currentTask = document.querySelector('#texto-tarefa');
const addTaskButton = document.querySelector('#criar-tarefa');
const olList = document.querySelector('#lista-tarefas');
const btnRemoveTasks = document.querySelector('#apaga-tudo');
const btnRemoveCompleted = document.querySelector('#remover-finalizados');
const btnRemoveSelected = document.querySelector('#remover-selecionado');
const btnMoveUp = document.querySelector('#mover-cima');
const btnMoveDown = document.querySelector('#mover-baixo');

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

// Adciona a classe completed nos elementos que foram clicados 2x e remove se já estiver com a classe completed
const isCompleted = (event) => {
  const task = event.target;
  if (task.classList.contains('completed')) {
    task.classList.remove('completed');
  } else {
    task.classList.add('completed');
  }
};

// Muda o background color do elemento selecionado, se possuir a classe selected.
const changeBackgroundColor = (event) => {
  const elemento = event;
  removeClassSelected();
  elemento.target.classList.add('selected');
  elemento.target.style.background = 'gray';
};

// Adiciona Listener aos elementos criados
const addListenerTask = (task) => {
  task.addEventListener('click', changeBackgroundColor);
  task.addEventListener('dblclick', isCompleted);
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

// Remove todas as tarefas
const removeAllTasks = () => {
  while (olList.firstChild) {
    olList.firstChild.remove();
  }
};

// Remove todas as tarefas completadas
const removeAllCompleted = () => {
  const list = getListElements();
  console.log(list);
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].classList.contains('completed')) list[i].remove();
  }
};

// Remove o elemento selecionado
const removeSelected = () => {
  const list = getListElements();
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].classList.contains('selected')) list[i].remove();
  }
};

// Checa se existe task com seleção
const checkSelection = () => {
  const list = getListElements();
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].classList.contains('selected')) {
      return true;
    }
  }
  alert('Selecione uma tarefa primeiro !');
  return false;
};

// Move a task para cima
const moveTaskUp = () => {
  if (checkSelection()) {
    const list = getListElements();
    const array = Array.from(list);
    console.log(array);
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].classList.contains('selected')) {
        array.splice(i, 1);
        array.splice(i - 1, 0, array[i]);
      }
    }
  }
};

// // Move a task para baixo
// const moveTaskDown = () => {
//   if (checkSelection()) {

//   } else {
//     alert('Selecione uma tarefa primeiro !');
//   }
// };

// btnMoveDown.addEventListener('click', moveTaskDown);
btnMoveUp.addEventListener('click', moveTaskUp);
btnRemoveSelected.addEventListener('click', removeSelected);
btnRemoveCompleted.addEventListener('click', removeAllCompleted);
btnRemoveTasks.addEventListener('click', removeAllTasks);
addTaskButton.addEventListener('click', addTaskToList);
currentTask.addEventListener('change', getTaskText);
