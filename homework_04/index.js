class ServiceSwaggerTasks {
  async fetchTasks() {
    try {
      return await fetch('https://tasks-service-maks1394.amvera.io/tasks')
      .then((response) => response.json());
    } catch (err) {
      console.error(err.message)
    }
  }

  async fetchTaskById(id) {
    try {
      return await fetch(`https://tasks-service-maks1394.amvera.io/tasks/${id}`)
      .then((response) => response.json());
    } catch (err) {
      console.error(err.message)
    }
  }

  async fetchTaskCreate(taskData) {
    try {
      return await fetch(`https://tasks-service-maks1394.amvera.io/tasks`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
          }
      )
      .then((response) => response.json());
    } catch (err) {
      console.error(err.message)
    }
  }

  async fetchTaskDeleteById(id) {
    try {
      return await fetch(`https://tasks-service-maks1394.amvera.io/tasks/${id}`,
          {
            method: 'DELETE',
          }
      )
      .then((response) => response.json()
      );
    } catch (err) {
      console.error(err.message)
    }
  }

  async fetchTaskUpdateById(id, updateData) {
    try {
      const task = await fetch(`https://tasks-service-maks1394.amvera.io/tasks/${id}`)
      .then((response) => response.json()
      );

      return await fetch(`https://tasks-service-maks1394.amvera.io/tasks/${id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({...task, ...updateData})
          }
      )
      .then((response) => response.json());
    } catch (err) {
      console.error(err.message)
    }
  }
}

class TasksData {
  _service = new ServiceSwaggerTasks()

  async fetchTasks() {
    return await this._service.fetchTasks()
  }

  async fetchTaskById(id) {
    return await this._service.fetchTaskById(id)
  }

  async fetchTaskCreate(taskData) {
    return await this._service.fetchTaskCreate(taskData)
  }

  async fetchTaskDeleteById(id) {
    return await this._service.fetchTaskDeleteById(id)
  }

  async fetchTaskUpdateById(id, updateData) {
    return await this._service.fetchTaskUpdateById(id, updateData)
  }
}

const addTasksInList = async () => {
  const tasksData = await new TasksData().fetchTasks();
  const tasksList = document.getElementById('taskList');
  let tasksItems = '';

  for (let i = 0; i < tasksData.length; i++) {
    tasksItems += `
        <li class="list__item">
          <input class="input" type="text" value="${tasksData[i].name}" id="${tasksData[i].id}"/>
          <div>
            <button class="button list__item--change" id="${tasksData[i].id}">Change item</button>
            <button class="button list__item--delete" id="${tasksData[i].id}">Delete item</button>
          </div>
          
        </li>
    `;

    tasksList.innerHTML = tasksItems;
  }
}

const app = async () => {
  await addTasksInList()
  const buttonAddTask = document.getElementById('buttonTaskAdd');
  buttonAddTask.addEventListener('click', async () => {
    await new TasksData().fetchTaskCreate({
      name: "Новая задача",
      info: "Описание задачи",
      isImportant: false,
      isCompleted: false
    })
    location.reload();
  })


  const buttonsChange = document.getElementsByClassName('list__item--change');
  const inputs = document.getElementsByClassName('input');
  for (let i = 0; i < buttonsChange.length; i++) {
    buttonsChange[i].addEventListener('click', async function(event) {
      const value = inputs[i].value;
      await new TasksData().fetchTaskUpdateById(event.target.id, {name: value});
      location.reload();
    });
  }

  const buttonsDelete = document.getElementsByClassName('list__item--delete');
  for (let i = 0; i < buttonsDelete.length; i++) {
    buttonsDelete[i].addEventListener('click', async function(event) {
       await new TasksData().fetchTaskDeleteById(event.target.id);
       location.reload();
    });
  }
}

await app();