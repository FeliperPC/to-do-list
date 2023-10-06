const currentTask = document.querySelector('#texto-tarefa');
const addTaskButton = document.querySelector('#criar-tarefa');
const olList = document.querySelector('#lista-tarefas');
const btnRemoveTasks = document.querySelector('#apaga-tudo');
const btnRemoveCompleted = document.querySelector('#remover-finalizados');
const btnRemoveSelected = document.querySelector('#remover-selecionado');
const btnMoveUp = document.querySelector('#mover-cima');
const btnMoveDown = document.querySelector('#mover-baixo');
const btnSaveTasks = document.querySelector('#salvar-tarefas');

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
  elemento.target.style.background = '#FFC107';
};

// Adiciona Listener aos elementos criados
const addListenerTask = (task) => {
  task.addEventListener('click', changeBackgroundColor);
  task.addEventListener('dblclick', isCompleted);
};

// Adiciona a tarefa criada na lista
const addTaskToList = () => {
  const taskItem = document.createElement('li');
  if (!getTaskText()) {
    alert('Insira a tarefa antes');
    return;
  }
  taskItem.innerText = getTaskText();
  taskItem.classList.add('task');
  addListenerTask(taskItem);
  olList.appendChild(taskItem);
  clearInputText();
};

// Adciona a tarefa salva novamente na lista de tarefas
const addExistingTaskToList = (task) => {
  const classes = task.class.split(' ');
  const existingTask = document.createElement('li');
  existingTask.innerText = task.value;
  addListenerTask(existingTask);
  for (let i = 0; i < classes.length; i += 1) {
    existingTask.classList.add(classes[i]);
  }
  existingTask.classList.remove('selected');
  olList.appendChild(existingTask);
};

// Remove todas as tarefas
const removeAllTasks = () => {
  while (olList.firstChild) {
    olList.firstChild.remove();
  }
  localStorage.clear();
};

// Remove todas as tarefas completadas
const removeAllCompleted = () => {
  const list = getListElements();
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].classList.contains('completed')) {
      list[i].remove();
      localStorage.removeItem(`task : ${i}`);
    }
  }
};

// Remove o elemento selecionado
const removeSelected = () => {
  const list = getListElements();
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].classList.contains('selected')) {
      list[i].remove();
      localStorage.removeItem(`task : ${i}`);
    }
  }
};

// Checa se existe task com seleção
const checkSelection = () => {
  const list = getListElements();
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].classList.contains('selected')) return i;
  }
  alert('Selecione uma tarefa primeiro !');
  return false;
};

// Move a task para cima
const moveTaskUp = () => {
  if (checkSelection() !== false) {
    const indexSelected = checkSelection();
    const list = getListElements();
    if (indexSelected !== 0) {
      olList.insertBefore(list[indexSelected], list[indexSelected - 1]);
    } else {
      alert('Esta tarefa já está no topo !');
    }
  }
};

// // Move a task para baixo
const moveTaskDown = () => {
  if (checkSelection() !== false) {
    const indexSelected = checkSelection();
    const list = getListElements();
    if (indexSelected !== list.length - 1) {
      olList.insertBefore(list[indexSelected + 1], list[indexSelected]);
    } else {
      alert('Esta tarefa já é a ultima !');
    }
  }
};

// Salva as tarefas para vizualizações futuras
const saveTasks = () => {
  localStorage.clear();
  const list = getListElements();
  for (let i = 0; i < list.length; i += 1) {
    const elementObj = {
      value: list[i].innerText,
      class: list[i].className,
    };
    localStorage.setItem(`task : ${i}`, JSON.stringify(elementObj));
  }
};

const getUpdatedTaskList = () => {
  for (let i = 0; i < localStorage.length; i += 1) {
    addExistingTaskToList(JSON.parse(localStorage.getItem(`task : ${i}`)));
  }
  return true;
};

btnSaveTasks.addEventListener('click', saveTasks);
btnMoveDown.addEventListener('click', moveTaskDown);
btnMoveUp.addEventListener('click', moveTaskUp);
btnRemoveSelected.addEventListener('click', removeSelected);
btnRemoveCompleted.addEventListener('click', removeAllCompleted);
btnRemoveTasks.addEventListener('click', removeAllTasks);
addTaskButton.addEventListener('click', addTaskToList);
currentTask.addEventListener('change', getTaskText);

window.onload = getUpdatedTaskList();
