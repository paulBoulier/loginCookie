import InputValidate from "./InputValidate.js"

const inputValidate = new InputValidate(document.getElementsByTagName("form")[0])

const lastnammeValidate = inputValidate.set("#lastname", ".feedback", "blur" /* link */)
lastnammeValidate.onsuccess(["is-valid"], ["text-success", function () { this.style.display = "none" }])
lastnammeValidate.onerror(["is-invalid"], ["text-danger", function () { this.style.display = "block" }])
const testSuccess = "Tout est ok"
const testError = [{
    test: /^ *$/,
    message: "Ecrivez votre nom",

},
{
    invert: true,
    test: /^[a-zA-Z\u00C0-\u017F']+$/,
    message: "Le nom n'est pas correct"
}]
lastnammeValidate.test(testSuccess, testError)





const genderValidate = inputValidate.set("#gender", ".feedback", "blur" /* link */)
genderValidate.onsuccess(["is-valid"], ["text-success", function () { this.style.display = "none" }])
genderValidate.onerror(["is-invalid"], ["text-danger", function () { this.style.display = "block" }])
const testSuccess2 = "Tout est ok"
const testError2 = [{
    test: /^ *$/,
    message: "Ecrivez votre nom",

},
{
    invert: true,
    test: /^[a-zA-Z\u00C0-\u017F']+$/,
    message: "Le nom n'est pas correct"
}]
genderValidate.test(testSuccess2, testError2)




inputValidate.add(lastnammeValidate, genderValidate, /* ... */)

// (?:(?:https?:\/\/)?(?:www\.)?)?instagram\.com\/[a-zA-Z.0-9]+\/?
// https://www.jquery-az.com/bootstrap4/demo.php?ex=76.0_6
// https://getbootstrap.com/docs/5.0/forms/validation/

/**
 * function() {
 *  this.style.display = "block" 
 * }
 * 
 * 
 */