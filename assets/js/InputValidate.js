class InputValidateItem {

    constructor(input, alert, eventType, link = false) {

        if (input.constructor.name != "HTMLInputElement" && input.constructor.name != "HTMLTextAreaElement" && input.constructor.name != "HTMLSelectElement") throw new Error("L'input n'est pas de type champ de formulaire")
        if (!(alert instanceof HTMLElement)) throw new Error("Le message doit être un élément HTML")
        if (link && !(link instanceof InputValidateItem)) throw new Error("Le lien n'est pas une instance de InputValidateItem")

        this.input = input
        this.alert = alert
        this.eventType = eventType
        this.link = link

        this.success = {
            input: { // <input class="...callback ...classs">
                callback: [],
                class: [],
            },
            alert: { // <div class="message ...callback ...class">
                callback: [],
                class: []
            },
            message: null
        }

        this.error = {
            input: { // <input class="...callback ...classs">
                callback: [],
                class: [],
            },
            alert: { // <div class="message ...callback ...class">
                callback: [],
                class: []
            },
            messageList: null // [{test: new RegExp(""), message: ""}]
        }

        this.response = null
    }

    /**
     * à la réponse ajoute une classe à l'input et à l'alerte et assigne son contenu
     * @param {String} responseType type de réponse (success ou error)
     * @param {Array} inputClassResponseList liste des classes à ajouter sur l'input en cas de succès
     * @param {Array} alertClassResponseList liste des classes à ajouter sur l'alerte en cas de succès
     * @param {String} message contenu de l'élément message
     */
    #on(responseType, inputClassResponseList, alertClassResponseList) {
        // n'est pas null et n'est pas de type Array
        if (inputClassResponseList != null && !Array.isArray(inputClassResponseList)) throw new Error("Le premier argument doit être de type array")
        if (alertClassResponseList != null && !Array.isArray(alertClassResponseList)) throw new Error("Le second argument doit être de type array")

        for (inputClassResponseItem of inputClassResponseList) {
            this[responseType][typeof inputClassSuccessItem == "function" ? "callback" : "class"].push(inputClassResponseItem)
        }

        for (alertClassSuccessItem of alertClassSuccessList) {
            this[responseType][typeof alertClassSuccessItem == "function" ? "callback" : "class"].push(alertClassSuccessItem)
        }
    }

    /**
     * à la condition d'un succès ajoute une classe à l'input et au message et assigne son contenu
     * @param {Array} inputClassResponseList liste des classes à ajouter sur l'input en cas de succès
     * @param {Array} alertClassResponseList liste des classes à ajouter sur l'alerte en cas de succès
     * @param {String} message contenu de l'élément message
     */
    onsuccess(inputClassResponseItem, alertClassResponseList) {
        this.#on("success", inputClassResponseItem, alertClassResponseList, message)
    }

    /**
     * à la condition d'une erreur ajoute une classe à l'input et au message et assigne son contenu
     * @param {Array} inputClassResponseList liste des classes à ajouter sur l'input en cas de succès
     * @param {Array} alertClassResponseList liste des classes à ajouter sur l'alerte en cas de succès
     * @param {String} message contenu de l'élément message
     */
    onerror(inputClassResponseItem, alertClassResponseList) {
        this.#on("error", inputClassResponseItem, alertClassResponseList, message)
    }

    /**
     * 
     */
    test(successMessage, errorMessage) {
        if (typeof successMessage != "string") throw new Error("successMessage doit être une string")
        if (typeof errorMessage != "array") throw new Error("errorMessage doit être un array")

        this.error.message = successMessage
        this.success.message = errorMessage

        const args = arguments
        for (let i = 0; i < args.length; i++) {
            if (args[i].constructor.name != "RegExp") throw new Error("L'argument n°" + i + " n'est pas une expression régulière")
        }
        this.regexList = [...args]
    }

}

export default class InputValidate {

    #form

    constructor(form) {
        this.#form = form
    }

    /**
     * 
     * @param {String} inputStr nom du sélécteur de l'input
     * @param {String} messageStr nom du sélécteur du message
     * @param {String} eventType nom de l'évènement
     * @param {InputValidateItem} link lien vers une instance de InputValidateItem
     */
    set(inputStr, alertStr, eventType, link = false) {

        const input = document.querySelector(inputStr)
        const message = input.parentElement.querySelector(alertStr)

        if (!input) throw new Error("Aucun sélecteur trouvé pour l'input")
        if (!message) throw new Error("Aucun sélecteur trouvé pour le message")

        if (input.constructor.name != "HTMLInputElement" && input.constructor.name != "HTMLTextAreaElement" && input.constructor.name != "HTMLSelectElement") throw new Error("L'input n'est pas de type champ de formulaire")
        if (!(message instanceof HTMLElement)) throw new Error("Le message doit être un élément HTML")

        return new InputValidateItem(input, message, eventType, link)
    }

    add() {
        const args = arguments
        for (const arg of args) {
            if (!(arg instanceof InputValidateItem)) throw new Error("Le lien n'est pas une instance de InputValidateItem")
        }
        for (const IVI of args) {
            IVI.input.addEventListener(IVI.eventType, function () {
                // boucle sur tous les messages
                let isValid = true
                for (const message of IVI.error.messageList) {
                    if (message.test.test(this.value)) {
                        IVI.alert.innerHTML = IVI.message
                        IVI.response = "error"
                        isValid = false
                        break;
                    }
                }
                if (isValid) {
                    IVI.alert.innerHTML = IVI.message
                    IVI.response = "success"
                }
                for (IVIInputCallback of IVI[IVI.response].input.callback) {
                    IVIInputCallback()
                }
                for (IVIInputClass of IVI[IVI.response].input.callback) {
                    IVI.input.classList.add(IVIInputClass)
                }
                for (IVIAlertCallback of IVI[IVI.response].alert.callback) {
                    IVIAlertCallback()
                }
                for (IVIAlertClass of IVI[IVI.response].alert.callback) {
                    IVI.input.classList.add(IVIAlertClass)
                }
            })
        }
    }

}