import InputValidate from "./InputValidate.js"

const inputValidate = new InputValidate(document.getElementsByTagName("form")[0])

const lastnammeValidate = inputValidate.set("#lastname", ".feedback", "blur" /* link */)
lastnammeValidate.onsuccess("is-valid", ["text-success", function () { this.style.display = "block" }])
lastnammeValidate.onerror("is-invalid", ["text-danger", function () { this.style.display = "block" }])
lastnammeValidate.test("Tout est ok",
    [{
        test: /^ *$/,
        message: "Ecrivez votre nom",

    },
    {
        test: /^[a-zA-Z\u00C0-\u017F']+$/,
        message: "Le nom n'est pas correct"
    }]
)
inputValidate.add(lastnammeValidate, /* ... */)

// (?:(?:https?:\/\/)?(?:www\.)?)?instagram\.com\/[a-zA-Z.0-9]+\/?
// https://www.jquery-az.com/bootstrap4/demo.php?ex=76.0_6
// https://getbootstrap.com/docs/5.0/forms/validation/