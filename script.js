class Contact {
  constructor(phone, name, email) {
    this.phone = phone;
    this.name = name;
    this.email = email;
  }
}

class UI {
  static ShowAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(`${message}`));

    const container = document.querySelector(".container");
    const form = document.querySelector("#contact-form");

    container.insertBefore(div, form);

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  static addContactToList(contact) {
    const list = document.querySelector("#contact-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td> ${contact.phone} </td>
    <td> ${contact.name} </td>
    <td> ${contact.email} </td>
    <td><a href='#' class="btn btn-danger btn-sm delete ">X</a></td>
    `;

    list.append(row);
  }

  static deleteContact(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#phone-number").value = "";
    document.querySelector("#full-name").value = "";
    document.querySelector("#email").value = "";
  }
}

document.querySelector("#contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const phone = document.querySelector("#phone-number").value;
  const name = document.querySelector("#full-name").value;
  const email = document.querySelector("#email").value;

  if (phone === "" || name === "" || email === "") {
    UI.ShowAlert("Please fill in all fields", "danger");
  } else {
    const contact = new Contact(phone, name, email);
    UI.addContactToList(contact);
    UI.ShowAlert("Contact added", "success");
    UI.clearFields();
  }
});

document.querySelector("#contact-list").addEventListener("click", (e) => {
  UI.deleteContact(e.target);
  UI.ShowAlert("Contact Deleted", "success");
});
