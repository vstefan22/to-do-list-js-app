const activeTasksArr = [];
const activeTasksSet = new Set(activeTasksArr);
const activeTasks = new Array(...activeTasksSet);
const completedTasks = [];
const items = document.querySelector(".items");
const cross = document.querySelector(".cross");
const itemsCompleted = document.querySelector(".items-completed");

// Add items
cross.addEventListener("click", function () {
  const newTask = document.querySelector(".task-input").value;
  if (newTask) {
    activeTasks.push(newTask);
    console.log(activeTasks);
    const html = `<div class="item" id = ${activeTasks.length}>
  <div class="dot"></div>
  <p>${newTask}</p>
  <div class="bin"><i class="fa fa-trash" aria-hidden="true"></i></div>
  </div>`;
    const newItem = items.insertAdjacentHTML("beforeend", html);
    addNewItem();
    updateHeader();
    document.querySelector(".task-input").value = "";
  }
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
    current.removeEventListener("click", addNewItem);
    current.addEventListener("click", function () {
      const clickedTask = activeTasks.indexOf(
        current.parentElement.children[1].innerHTML
      );

      if (clickedTask !== -1) {
        const task = activeTasks.splice(clickedTask, 1);
        completedTasks.push(current.parentElement.children[1].innerHTML);
        updateUI(current);
        binFunc();
        updateHeader();
      }
    });
  });
}

document.querySelector(".btn-search").addEventListener("click", function () {
  const input = document.querySelector(".search-input").value;
  activeTasks.filter((cur, i) => {
    if (cur === input.toLowerCase()) {
      console.log(cur);
      console.log(i);
      console.log(input.toLowerCase());

      const as = document.getElementById(`${i + 1}`).classList.add("selected");
      document.querySelector(".search-input").value = "";
    }
  });

  completedTasks.filter((cur, i) => {
    if (cur === input.toLowerCase()) {
      const as = document
        .getElementById(`${i}-completed`)
        .classList.add("selected");
      document.querySelector(".search-input").value = "";
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

const removeMarker = function () {
  document.querySelectorAll(".items").forEach((cur, i) => {
    cur.addEventListener("click", function (e) {
      const as = e.target.classList.remove("selected");
    });
  });
};
removeMarker();
