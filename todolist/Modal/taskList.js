
function TaskList() {
  this.list = [];

  this.findPositionTask = (id) => {
    const index = -1;
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  };

  this.deleteTask = (id) => {
    const index = this.findPositionTask(id);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
  };
}
export default TaskList;
