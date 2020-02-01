window.onload = function () {

  const box = document.querySelectorAll('li')
  const list = document.querySelectorAll('ul')
  const area = document.querySelector('section')
  
  // console.log(box, list);

  area.addEventListener('dragstart', e => {
    // console.log(e.target.closest('li').id);
    const el = e.target.closest('li')
    const id = el.id
    e.dataTransfer.setData('text/plain', id)
    e.dataTransfer.effectAllowed = 'move' 
    el.classList.add('hide')
  })

  function dragEnter(e) {
    if (e.dataTransfer.types[0] === 'text/plain') {
      e.preventDefault()
      console.log(e.target);
      this.classList.add('drag')
    }
    
  }
  function dragLeave(e) {
    console.log(e.relatedTarget.closest('ul'));
    if (e.relatedTarget.closest('ul') === null) {
      e.preventDefault()
      this.classList.remove('drag')
    }
  }

  function dragOver(e) {
    e.preventDefault()
  }
  function dragDrop(e) {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    const el = document.getElementById(id)
    this.classList.remove('drag')
    this.prepend(el)
    el.classList.remove('hide')
  }

  for (let i = 0; i < list.length; i++) {
    const el = list[i];
    el.addEventListener('dragenter', dragEnter)
    el.addEventListener('dragover', dragOver)
    el.addEventListener('dragleave', dragLeave)
    el.addEventListener('drop', dragDrop)
  }


  class Buttons {
    constructor(taskProcess, taskAction) {
      this.taskProcess = taskProcess
      this.taskAction = taskAction
      this.areas = document.querySelectorAll('ul')
      this.btnProcess = document.querySelectorAll('.process')
      this.btnComplite = document.querySelectorAll('.done')
    }

    taskActionBtns = (el, name) => {
      el.addEventListener('click', e => {
        const item = e.target.closest('li')
        const list = e.target.closest('ul')
        this.areas.forEach(area => {
          if (area === list) {
            return
          }
          area.prepend(item)
          console.log(name);
        })

      })
    }

    taskInProcess = () => {
      this.btnProcess.forEach(el => {
        el.textContent = this.taskProcess
        this.taskActionBtns(el)
      })
    }

    taskComplited = () => {
      this.btnComplite.forEach(el => {
        el.textContent = this.taskProcess
        this.taskActionBtns(el, this.taskProcess)
      })
    }
  }
  const taskInProcess = new Buttons('in process', null)
  const taskComplited = new Buttons('complite', 'delete')

  taskInProcess.taskInProcess()

  taskComplited.taskComplited()
  
  
}