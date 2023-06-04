document.addEventListener("DOMContentLoaded", function () {
  // refresh qiganda eski malumotlarni tozalash
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
});

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent from submitting

    // kiritilgan email va password larni olish
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // tekshir  email va password  to'grimi
    var correctEmail = "sukhrob2707@gmail.com";
    var correctPassword = "2023";

    if (email === correctEmail && password === correctPassword) {
      //   agar true bolsa keyingi page ga otsin
      window.location.href = "/table.html";
    } else {
      // yoki error message chiqadi
      alert("Hato email yoki password. Iltmos to'gri info kiriting 😂");
    }

    // infoni tozalash submit qilgandan kn
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  });
