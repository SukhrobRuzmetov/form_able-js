let employees = [];

// Check if data exists in localStorage
const storedEmployees = localStorage.getItem("employees");
if (storedEmployees) {
  employees = JSON.parse(storedEmployees);
  displayEmployees();
}

// Get form elements
const modal = document.getElementById("employeeModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementsByClassName("close")[0];
const employeeForm = document.getElementById("employeeForm");
const searchNameInput = document.getElementById("searchName");
const filterPositionSelect = document.getElementById("filterPosition");

// Open modal form
openModalBtn.onclick = function () {
  modal.style.display = "block";
};

// Close modal form
closeModalBtn.onclick = function () {
  modal.style.display = "none";
  employeeForm.reset();
};

// Add new employee to table and localStorage
document
  .getElementById("employeeForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const birthDate = document.getElementById("birthDate").value;
    const position = document.getElementById("position").value;
    const typePosition = document.getElementById("typePosition").value;
    const salary = document.getElementById("salary").value;
    const isMarried = document.getElementById("isMarried").checked;

    const newEmployee = {
      firstName,
      lastName,
      address,
      birthDate,
      position,
      typePosition,
      salary,
      isMarried,
    };

    employees.push(newEmployee);
    localStorage.setItem("employees", JSON.stringify(employees));
    displayEmployees();

    modal.style.display = "none";
    employeeForm.reset();
  });

// Display employees in table
function displayEmployees() {
  const tableBody = document.getElementById("employeeTableBody");
  tableBody.innerHTML = "";

  employees.forEach(function (employee, index) {
    const row = tableBody.insertRow();
    row.innerHTML = `
        <td>${employee.firstName}</td>
        <td>${employee.lastName}</td>
        <td>${employee.address}</td>
        <td>${employee.birthDate}</td>
        <td>${employee.position}</td>
        <td>${employee.typePosition}</td>
        <td>${employee.salary}</td>
        <td>${employee.isMarried ? "Yes" : "No"}</td>
        <td>
          <button onclick="editEmployee(${index})"><i class="fa-solid fa-pen-to-square fa-flip" style="color: #5d81bb;"></i></button>
          <button onclick="confirmDeleteEmployee(${index})"><i class="fa-solid fa-trash-can fa-shake" style="color: #f02828;"></i></button>
        </td>
      `;
  });
}

// Edit employee details
function editEmployee(index) {
  const employee = employees[index];

  document.getElementById("firstName").value = employee.firstName;
  document.getElementById("lastName").value = employee.lastName;
  document.getElementById("address").value = employee.address;
  document.getElementById("birthDate").value = employee.birthDate;
  document.getElementById("position").value = employee.position;
  document.getElementById("typePosition").value = employee.typePosition;
  document.getElementById("salary").value = employee.salary;
  document.getElementById("isMarried").checked = employee.isMarried;

  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  displayEmployees();

  modal.style.display = "block";
}

// Confirm and delete employee
function confirmDeleteEmployee(index) {
  const employee = employees[index];

  if (
    confirm(
      `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`
    )
  ) {
    deleteEmployee(index);
  }
}

// Delete employee from table and localStorage
function deleteEmployee(index) {
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  displayEmployees();
}

// Search employees by name
function searchEmployees() {
  const searchTerm = searchNameInput.value.toLowerCase();
  const filteredEmployees = employees.filter(function (employee) {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    return fullName.includes(searchTerm);
  });

  displayFilteredEmployees(filteredEmployees);
}

// Filter employees by position
function filterEmployees() {
  const filterValue = filterPositionSelect.value;
  let filteredEmployees;

  if (filterValue) {
    filteredEmployees = employees.filter(function (employee) {
      return employee.typePosition === filterValue;
    });
  } else {
    filteredEmployees = employees;
  }

  displayFilteredEmployees(filteredEmployees);
}

// Display filtered employees in table
function displayFilteredEmployees(filteredEmployees) {
  const tableBody = document.getElementById("employeeTableBody");
  tableBody.innerHTML = "";

  filteredEmployees.forEach(function (employee, index) {
    const row = tableBody.insertRow();
    row.innerHTML = `
        <td>${employee.firstName}</td>
        <td>${employee.lastName}</td>
        <td>${employee.address}</td>
        <td>${employee.birthDate}</td>
        <td>${employee.position}</td>
        <td>${employee.typePosition}</td>
        <td>${employee.salary}</td>
        <td>${employee.isMarried ? "Yes" : "No"}</td>
        <td>
          <button onclick="editEmployee(${index})">Edit</button>
          <button onclick="confirmDeleteEmployee(${index})">Delete</button>
        </td>
      `;
  });
}

//   bg animate------------
