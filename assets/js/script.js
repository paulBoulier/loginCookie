import InputValidate from "./InputValidate.js"

const inputValidate = new InputValidate(document.getElementsByTagName("form")[0])

const lastnammeValidate = inputValidate.set("#lastname", ".feedback", "blur" /* link */)
lastnammeValidate.onsuccess(["is-valid"], ["text-success", function () { this.style.display = "block" }], "Tout est ok")
lastnammeValidate.onerror(["is-invalid"], ["text-danger", function () { this.style.display = "block" }], "Le nom n'est pas correct")
console.log(Object.keys(lastnammeValidate))
lastnammeValidate.check(/^[a-zA-Z\u00C0-\u017F']+$/ /* sous check ? */)
inputValidate.add(lastnammeValidate, /* ... */)

// (?:(?:https?:\/\/)?(?:www\.)?)?instagram\.com\/[a-zA-Z.0-9]+\/?
// https://www.jquery-az.com/bootstrap4/demo.php?ex=76.0_6
// https://getbootstrap.com/docs/5.0/forms/validation/