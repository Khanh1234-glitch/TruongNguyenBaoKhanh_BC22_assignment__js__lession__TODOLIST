import Task from "./renderTask.js";

class CompletedTask extends Task {
  constructor(...props) {
    super(...props);
    this.isCompleted = true;
  }

  renderTask() {
    const task = this.task;

    return `
        <li>
            <span>${task}</span>
            <div class="buttons">
                <button class="remove" onlick="Delete('${task}')">
                    <i class="fa-solid fa-trash-can" ></i>
                </button>
                <button class="complete">
                    <i class="fa-regular fa-circle-check fas"></i>
                </button>
            </div>
        </li>
    `;
  }
}

export default CompletedTask;