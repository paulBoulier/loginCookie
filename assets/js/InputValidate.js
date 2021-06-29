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

        for (const inputClassResponseItem of inputClassResponseList) {
            this[responseType].input[typeof inputClassResponseItem == "function" ? "callback" : "class"].push(inputClassResponseItem)
        }

        for (const alertClassResponseItem of alertClassResponseList) {
            this[responseType].alert[typeof alertClassResponseItem == "function" ? "callback" : "class"].push(alertClassResponseItem)
        }
    }

    /**
     * à la condition d'un succès ajoute une classe à l'input et au message et assigne son contenu
     * @param {Array} inputClassResponseList liste des classes à ajouter sur l'input en cas de succès
     * @param {Array} alertClassResponseList liste des classes à ajouter sur l'alerte en cas de succès
     * @param {String} message contenu de l'élément message
     */
    onsuccess(inputClassResponseItem, alertClassResponseList) {
        this.#on("success", inputClassResponseItem, alertClassResponseList)
    }

    /**
     * à la condition d'une erreur ajoute une classe à l'input et au message et assigne son contenu
     * @param {Array} inputClassResponseList liste des classes à ajouter sur l'input en cas de succès
     * @param {Array} alertClassResponseList liste des classes à ajouter sur l'alerte en cas de succès
     * @param {String} message contenu de l'élément message
     */
    onerror(inputClassResponseItem, alertClassResponseList) {
        this.#on("error", inputClassResponseItem, alertClassResponseList)
    }

    /**
     * 
     */
    test(successMessage, errorMessageList) {
        if (typeof successMessage != "string") throw new Error("successMessage doit être une string")
        if (!Array.isArray(errorMessageList)) throw new Error("errorMessage doit être un array")

        for (const errorMessage of errorMessageList) {
            if (errorMessage.test.constructor.name != "RegExp") throw new Error("La propriété test de l'argument n°" + i + " n'est pas une expression régulière")
            if (typeof errorMessage.message != "string") throw new Error("La propriété message de l'argument n°" + i + " n'est pas une string")
            if(!errorMessage.invert) errorMessage.invert = false
        }

        this.success.message = successMessage
        this.error.messageList = errorMessageList
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
                    console.log(message.test.test(this.value), message.invert)
                    if (message.test.test(this.value) != message.invert) {
                        console.log(message)
                        IVI.alert.innerHTML = message.message
                        IVI.response = "error"
                        isValid = false
                        break;
                    }
                }
                if (isValid) {
                    IVI.alert.innerHTML = IVI.success.message
                    IVI.response = "success"
                }

                const iResponse = ["success", "error"]

                iResponse.splice(iResponse.indexOf(IVI.response), 1)

                // désactiver les anciens styles
                for (const IVIInputClass of IVI[iResponse[0]].input.class) {
                    IVI.input.classList.remove(IVIInputClass)
                }
                for (const IVIAlertClass of IVI[iResponse[0]].alert.class) {
                    IVI.alert.classList.remove(IVIAlertClass)
                }

                for (const IVIInputCallback of IVI[IVI.response].input.callback) {
                    IVIInputCallback.call(this)
                }
                for (const IVIInputClass of IVI[IVI.response].input.class) {
                    IVI.input.classList.add(IVIInputClass)
                }
                for (const IVIAlertCallback of IVI[IVI.response].alert.callback) {
                    IVIAlertCallback.call(IVI.alert)
                }
                for (const IVIAlertClass of IVI[IVI.response].alert.class) {
                    IVI.alert.classList.add(IVIAlertClass)
                }
            })
        }
    }

}