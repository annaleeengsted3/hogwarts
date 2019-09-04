"use strict";
//declare global variables: array of all students, filters, sort buttons, etc
let allStudents = [];
let filter = "all";
let sortButton = "first_name";
let studentHouse;
let fullName;
let firstName;
let lastName;

//Load page:
document.addEventListener("DOMContentLoaded", init);

//load JSON data with async function, set basic eventlisteners:
async function init() {
  const url = "http://petlatkea.dk/2019/students1991.json";
  const jsonData = await fetch(url);
  allStudents = await jsonData.json();

  document.querySelectorAll(".filter").forEach(elm => {
    elm.addEventListener("click", filterFc);
  });
  document.querySelectorAll(".sort").forEach(elm => {
    elm.addEventListener("click", sortFc);
  });

  //Go to show student list
  showStudentList();
}

//Show students, if-filter, add clone, add eventlistener, popup
function showStudentList() {
  const dest = document.querySelector("#list");
  const tempStudent = document.querySelector("#student");

  //reset list
  dest.innerHTML = "";

  //show array, forEach student that fulfills filter,
  allStudents.forEach(student => {
    if (filter == "all" || filter == student.house) {
      //cloneNode
      let clone = tempStudent.cloneNode(true).content;

      clone.querySelector(".name").innerHTML = student.fullname;
      clone.querySelector(".house").innerHTML = student.house;
      dest.appendChild(clone);

      //AND add eventlistener and popup (TO DO: make this template+clone later- string copied here for now -- tried clone, didnt work)
      dest.lastElementChild.addEventListener("click", () => {
        document.querySelector("#pop_content").innerHTML = `
        <article>
    <h2>${student.fullname}</h2>
    <img src = "img/${student.fullname}.jpg" alt = "${student.fullname}"><br>
    <h3>${student.house}</h3>
    <img src = "img/${student.house}.png" alt = "${student.house} Crest"><br>
    </article>
    `;

        document.querySelector("#popup").style.display = "block";
        studentHouse = `${student.house}`;
        stylePopup();
      });
    } //if-statement end
  }); //forEach loop end
} //showStudentList end

function stylePopup() {
  //house colors, fix later
  const Gryffindor = "#9d2121";
  const gryf2 = "#f3c019";
  const Hufflepuff = "#f3de07";
  const huff2 = "#0c0d08";
  const Slytherin = "#234723";
  const slyth2 = "#9e9996";
  const rave1 = "#725438";
  const Ravenclaw = "#0b304a";
  if (studentHouse == "Gryffindor") {
    document.querySelector("#popup").style.backgroundColor = Gryffindor;
  } else if (studentHouse == "Hufflepuff") {
    document.querySelector("#popup").style.backgroundColor = Hufflepuff;
  } else if (studentHouse == "Ravenclaw") {
    document.querySelector("#popup").style.backgroundColor = Ravenclaw;
  } else if (studentHouse == "Slytherin") {
    document.querySelector("#popup").style.backgroundColor = Slytherin;
  }

  document.querySelector("#exit button").addEventListener("click", () => {
    document.querySelector("#popup").style.display = "none";
  });
}

//filter function. Get data from clicked filter.
function filterFc() {
  filter = this.getAttribute("data-house");
  document.querySelector("h2").textContent = this.textContent; //Do I want this? Maybe no
  document.querySelectorAll(".filter").forEach(active => {
    active.classList.remove("active");
  });
  this.classList.add("active");

  showStudentList();
}

function sortFc() {
  sortButton = this.getAttribute("data-sort");

  //separate names, add them to array
  allStudents.forEach(student => {
    fullName = student.fullname;
    const secondSpace = fullName.lastIndexOf(" ");

    lastName = fullName.substring(secondSpace + 1, fullName.length);
    //TO DO: Figure out how to add "lastName": "value" key pair to allStudents- Make a for loop, i=allStudents.length
  });

  if (sortButton == "last_name") {
    allStudents.sort((a, b) => {
      //TO DO: LAST NAME SORTING NOT WORKING
      // return a.lastName.localeCompare(b.lastName);
    });
  } else if (sortButton == "first_name") {
    allStudents.sort((a, b) => {
      return a.fullname.localeCompare(b.fullname);
    });
  } else {
    allStudents.sort((a, b) => {
      return a.house.localeCompare(b.house);
    });
  }

  showStudentList();
}
