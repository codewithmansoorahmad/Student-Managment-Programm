const submitBtn = document.querySelector(".add");
const name = document.querySelector("#name");
const age = document.querySelector("#age");
const id = document.querySelector("#id");
const total = document.querySelector(".total");
const show = document.querySelector("#show");
const hide = document.querySelector("#hide");
const display = document.querySelector(".display");
const tbody = document.querySelector(".tbody");
const thead = document.querySelector(".thead");
const averageMarks = document.querySelector(".ave");
const highestMarks = document.querySelector(".high");
const lowestMarks = document.querySelector(".low");
const female = document.querySelector("#female");
const male = document.querySelector("#male");
const table = document.querySelector("table");
const search = document.querySelector("#search");
const card = document.querySelector(".card");

const marks = document.querySelector("#marks");
const form = document.querySelector("form");

name.addEventListener("input", function () {
  name.value = name.value.replace(/[^A-Za-z]/g, "");
});

let tasks = JSON.parse(localStorage.getItem("contents")) || [];
console.log(tasks);
form.addEventListener("submit", function (e) {
  e.preventDefault();
});

submitBtn.addEventListener("click", function (event) {
  // event.preventDefault();

  const radio = document.querySelector('input[name="gender"]:checked');

  if (
    name.value == "" ||
    age.value == "" ||
    marks.value == "" ||
    id.value == "" ||
    !radio
  ) {
    return;
  }

  const existId = tasks.some((item) => item.id == id.value);
  const existName = tasks.some(
    (item) => item.name.toLowerCase() == name.value.toLowerCase(),
  );
  if (existId) {
    alert("id already used ");
    return;
  }
  if (existName) {
    let isConfirm = confirm("DO you sure to create a new user with same Name ");
    if (!isConfirm) {
      return;
    }
  }

  let obj = {
    id: id.value,
    name: name.value,
    age: age.value,
    marks: marks.value,
    gender: radio.value,
  };
  console.log(obj);

  tasks.push(obj);
  localStorage.setItem("contents", JSON.stringify(tasks));
  if (thead.rows.length === 0) {
    thead.innerHTML = `
     <tr>
            <td>No</td>
            <td >ID</td>
            <td >Name</td>
            <td >Age</td>
            <td >Marks</td>
            <td>Gender</td>
            <td>Edit Student</td>
            <td>Delete Student</td>
          </tr>
    `;
  }
  tbody.innerHTML += name.value = "";
  age.value = "";
  id.value = "";
  marks.value = "";
  male.checked = false;
  female.checked = false;
  tbody.innerHTML += `
  <tr class="row">
            <td>${tasks.length}</td>
            <td class="id-td">${obj.id}</td>
            <td class="name-td">${obj.name}</td>
            <td class="age-td">${obj.age}</td>
            <td class="marks-td">${obj.marks}</td>
            <td class="gender-td">${obj.gender}</td>
            <td><button id="edit-btn">Edit</button></td>
            <td><button id="delete-btn">Delete</button></td>
          </tr>
          `;
  getResult();
});

show.addEventListener("click", function () {
  if (tasks.length === 0) {
    thead.innerHTML = "";
    return;
  }
  show.style.display = "none";

  table.style.display = "block";
  hide.style.display = "block";
  getHtml();
});
display.addEventListener("click", function (e) {
  if (e.target.id === "hide") {
    thead.innerHTML = "";
    tbody.innerHTML = "";
    hide.style.display = "none";
    table.style.display = "none";

    show.style.display = "block";
  }
});

table.addEventListener("click", function (e) {
  if (e.target.id == "edit-btn") {
    let tr = e.target.closest("tr");
    let tdName = tr.querySelector(".name-td");
    let tdMarks = tr.querySelector(".marks-td");
    let tdId = tr.querySelector(".id-td");
    let tdAge = tr.querySelector(".age-td");
    let tdGender = tr.querySelector(".gender-td");

    name.value = tdName.textContent;
    age.value = tdAge.textContent;
    id.value = tdId.textContent;
    marks.value = tdMarks.textContent;
    id.readOnly = true;

    tdGender.textContent === "male"
      ? (male.checked = true)
      : (female.checked = true);

    // console.log(male)

    // id.disabled=false
  }
  if (e.target.id == "delete-btn") {
    let isConfirm = confirm("CONFIRM F YOU WANT TO DELETE USER ");

    if (isConfirm) {
      tbody.innerHTML = "";
      let tr = e.target.closest("tr");
      let tdId = tr.querySelector(".id-td");
      const idDelete = tasks.findIndex((item) => item.id === tdId.textContent);
      if (idDelete != -1) {
        tasks.splice(idDelete, 1);
        localStorage.setItem("contents", JSON.stringify(tasks));

        tasks.forEach((user, index) => {
          tbody.innerHTML += `
  <tr id=id-${index}>
            <td>${index}</td>
            <td class="id-td">${user.id}</td>
            <td class="name-td">${user.name}</td>
            <td class="age-td">${user.age}</td>
            <td class="marks-td">${user.marks}</td>
            <td class="gender-td">${user.gender}</td>
            <td><button id="edit-btn">Edit</button></td>
            <td><button id="delete-btn">Delete</button></td>
          </tr>
 `;
        });
      }
      getResult();
      if (tasks.length === 0) {
        thead.innerHTML = "";
      }
      //    if(tbody.ariaRowCount.length===0){
      //   thead.innerHTML=""
      //   return
      // }
    }
  }
});

function getResult() {
  if (tasks.length === 0) {
    total;
    averageMarks.textContent = "Average Marks: 0";
    highestMarks.textContent = "Highest Marks: 0";
    lowestMarks.textContent = "Lowest Marks: 0";
    total.textContent = "Total Students: 0";

    return;
  }
  total.textContent = "Total Students:" + tasks.length;

  let sum = 0;
  let lowest = tasks[0].marks;
  let highest = 0;
  tasks.forEach((item) => {
    sum += Number(item.marks);
    if (item.marks > highest) {
      highest = item.marks;
    }
    if (item.marks < lowest) {
      lowest = item.marks;
    }
  });
  console.log(sum);
  console.log(lowest);
  averageMarks.textContent =
    "Average Marks: " + (sum / tasks.length).toFixed(2);
  highestMarks.textContent = "HighestMarks: " + highest;
  lowestMarks.textContent = "LowestMarks: " + lowest;
}
getResult();
function getHtml() {
  thead.innerHTML = `
     <tr>
            <td>No</td>
            <td >ID</td>
            <td >Name</td>
            <td >Age</td>
            <td >Marks</td>
            <td>Gender</td>
            <td>Edit Student</td>
            <td>Delete Student</td>
          </tr>
    `;
  tasks.forEach((user, index) => {
    tbody.innerHTML += `
  <tr class="row">
            <td>${index}</td>
            <td class="id-td">${user.id}</td>
            <td class="name-td">${user.name}</td>
            <td class="age-td">${user.age}</td>
            <td class="marks-td">${user.marks}</td>
            <td class="gender-td">${user.gender}</td>
            <td><button id="edit-btn">Edit</button></td>
            <td><button id="delete-btn">Delete</button></td>
          </tr>
 `;
  });
}
// getHtml()

search.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    let val = e.target.value;
    let filter = tasks.filter((item) => item.id === val);
    if (filter.length === 0) {
      alert("NO ID FOUNDED");
      search.value = "";
      return;
    }
    console.log(filter);

    card.innerHTML = `
  <h3>id:${filter[0].id}</h3>
  <h3>name: ${filter[0].name}</h3>
  <h3>age: ${filter[0].age}</h3>
  <h3>marks: ${filter[0].marks}</h3>
  <h3>gender: ${filter[0].gender}</h3>
  <button class="hide-1">Hide</button>
  `;
    search.value = "";
  }
});
card.addEventListener("click", function (e) {
  if (e.target.className === "hide-1") {
    card.innerHTML = "";
    search.focus();
  }
});
