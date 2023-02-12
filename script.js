const activeTasks = [
  "clean room",
  "play guitar",
  "do homework",
  "go to the gym",
  "go to the bank",
  "clean room",
  "play guitar",
  "do homework",
  "go to the gym",
  "go to the bank",
];
const completedTasks = [];
const items = document.querySelector(".items");
const cross = document.querySelector(".cross");
const itemsCompleted = document.querySelector(".items-completed");

activeTasks.forEach(function (current, i) {
  const html = `<div class="item" id=${i}>
<div class="dot"></div>
<p>${current}</p>
<div class="bin"><i class="fa fa-trash" aria-hidden="true"></i></div>
</div>`;
  items.insertAdjacentHTML("beforeend", html);
});

// Add items
cross.addEventListener("click", function () {
  const newTask = document.querySelector(".task-input").value;
  activeTasks.push(newTask);
  const html = `<div class="item">
  <div class="dot"></div>
  <p>${newTask}</p>
  <div class="bin"><i class="fa fa-trash" aria-hidden="true"></i></div>
  </div>`;
  const newItem = items.insertAdjacentHTML("beforeend", html);

  addNewItem();
});
const updateUI = function (finishedTask, del) {
  if (!del) {
    const htmlNew = `<div class="item-complete"  id=${
      completedTasks.length - 1
    }-completed>
  
  <p>${finishedTask.parentElement.children[1].innerHTML}</p>
  <div class="bin"><i class="fa fa-trash" aria-hidden="true"></i></div>
  </div>`;
    const completedItem = itemsCompleted.insertAdjacentHTML(
      "beforeend",
      htmlNew
    );
    finishedTask.parentElement.classList.add("hidden");
  } else {
    finishedTask.parentElement.classList.add("hidden");
  }
};
// Remove task
const binFunc = function () {
  const bin = document.querySelectorAll(".bin");
  bin.forEach((current, i) => {
    current.addEventListener("click", function () {
      const a = activeTasks.includes(
        current.parentElement.children[1].textContent
      );
      if (a) {
        activeTasks.splice(a, 1);
      } else {
        completedTasks.splice(a, 1);
      }
      updateUI(current, true);
      updateHeader();
    });
  });
};
binFunc();
// Finished task
function addNewItem() {
  const dot = document.querySelectorAll(".dot");
  const listen = dot.forEach((current, i) => {
    current.addEventListener("click", function () {
      const clickedTask = activeTasks.indexOf(i);
      activeTasks.splice(clickedTask, 1);
      completedTasks.push(current.parentElement.children[1].innerHTML);
      updateUI(current);
      binFunc();
      updateHeader();
    });
  });
}
addNewItem();
document.querySelector(".btn-search").addEventListener("click", function () {
  const input = document.querySelector(".search-input").value;
  activeTasks.filter((cur, i) => {
    if (cur === input.toLowerCase()) {
      const as = document.getElementById(`${i}`).classList.add("selected");
    }
  });

  completedTasks.filter((cur, i) => {
    if (cur === input.toLowerCase()) {
      const as = document
        .getElementById(`${i}-completed`)
        .classList.add("selected");
    }
  });
});

const updateHeader = function () {
  document
    .querySelector(".items-completed")
    .querySelector("h1").innerHTML = `Completed tasks (${
    completedTasks.length === 0 ? "" : completedTasks.length
  })`;
  document.querySelector(".active-tasks").innerHTML = `Remaining (${
    activeTasks.length === 0 ? "" : activeTasks.length
  })`;
};
updateHeader();
