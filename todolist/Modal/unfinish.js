import Task from "./renderTask.js";

class UncompletedTask extends Task {
  constructor(...props) {
    super(...props);
    this.isCompleted = false;
  }

  renderTask() {
    const text = this.text;

    return `
        <li>
            <span>${text}</span>
            <div class="buttons">
                <button class="remove">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
                <button class="complete" onlick="complete('${text}')">
                    <i class="fa-regular fa-circle-check" ></i>
                </button>
            </div>
        </li>
    `;
  }
}

export default UncompletedTask;