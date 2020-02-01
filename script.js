window.onload = function () {

    // DOM элементы
  const boxes = document.querySelectorAll('.arena')
  const items = document.querySelectorAll('.item')


  function start(e) {
      // Устанавливаем данные которые хотим передать в месте с элементом
      // При перетаскивании 
    e.dataTransfer.setData('text/plain', this.id)
      // Операция с текущим элементом
      // В данном случае перетаскиваем его полностью 'move'
    e.dataTransfer.effectAllowed = 'move'
  }


  function enter(e) {
      // Целевой элемент DOM (зона перетаскивания)
      // Для добавления класса
    const el = e.target
      // Тип данных которые передаются с событием 'dragstart'
    const data = e.dataTransfer.types[0]
    // console.log(data);
      // Проверка на наличие передачи данных
    if (data === 'text/plain') {
        // Свойства браузера по умолчанию ОБЯЗАТЕЛЬНО!!!
      e.preventDefault()
    }
    el.classList.add('drag')
  }


  function over(e) {
      // Тип данных которые передаются с событием 'dragstart'
    const data = e.dataTransfer.types[0]
      // Проверка на наличие передачи данных
    if (data === 'text/plain') {
        // Свойства браузера по умолчанию ОБЯЗАТЕЛЬНО!!!
      e.preventDefault()
    }
  }

  
  function leave(e) {
    const el = e.target.closest('.arena')
      // relatedTarget -  если курсор покидает текущий элемент
      // но остаётся ещё в родительном элементе, срабатывает событие 
      // mouseout, чтоб этого избежать используем relatedTarget
      // e.target – это элемент, с которого курсор ушёл
      // e.relatedTarget – это элемент, на который курсор перешёл (target → relatedTarget)
      
    if (e.relatedTarget.closest('.arena') === null) {
        // Свойства браузера по умолчанию ОБЯЗАТЕЛЬНО!!!
      e.preventDefault()
      el.classList.remove('drag')
    }
  }


  function drop(e) {
      // Свойства браузера по умолчанию ОБЯЗАТЕЛЬНО!!!
    e.preventDefault()
      // Забираем данные с трансфера
    const id = e.dataTransfer.getData('text/plain')
      // Вставляем перемещенный элемент
    const el = e.target.appendChild(document.getElementById(id))
    el.classList.remove('drag')
    
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    item.addEventListener('dragstart', start)
    // item.addEventListener('dragend', end, false)
  }
  for (let j = 0; j < boxes.length; j++) {
    const el = boxes[j];
    el.addEventListener('dragover', over)
    el.addEventListener('dragenter', enter)
    el.addEventListener('dragleave', leave)
    el.addEventListener('drop', drop)
  }
}