class ServiceSwaggerTasks {
  async fetchTasks() {
    try {
      return await fetch('https://tasks-service-maks1394.amvera.io/tasks')
      .then((response) => {
        response.json()
      });
    } catch (err) {
      console.error(err.message)
    }
  }

  async fetchTaskById(id) {
    try {
      return await fetch(`https://tasks-service-maks1394.amvera.io/tasks/${id}`)
      .then((response) => {
        response.json()
      });
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
      .then((response) => {
        response.json()
      });
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
      .then((response) => {
        response.json()
      });
    } catch (err) {
      console.error(err.message)
    }
  }

  async fetchTaskUpdateById(id, updateData) {
    try {
      const task = await fetch(`https://tasks-service-maks1394.amvera.io/tasks/${id}`)
      .then((response) => {
        response.json()
      });

      return await fetch(`https://tasks-service-maks1394.amvera.io/tasks/${id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({...task, ...updateData})
          }
      )
      .then((response) => {
        response.json()
      });
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

new ServiceSwaggerTasks().fetchTasks().then((data) => console.log(data));

