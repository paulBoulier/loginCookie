class InputValidateItem {

    constructor(input, message, eventType, link = false) {

        if (input.constructor.name != "HTMLInputElement" && input.constructor.name != "HTMLTextAreaElement" && input.constructor.name != "HTMLSelectElement") throw new Error("L'input n'est pas de type champ de formulaire")
        if (!(message instanceof HTMLElement)) throw new Error("Le message doit être un élément HTML")
        if (link && !(link instanceof InputValidateItem)) throw new Error("Le lien n'est pas une instance de InputValidateItem")

        this.input = input
        this.message = message
        this.eventType = eventType
        this.link = link

        this.success = {
            inputLogic: null,
            messageLogic: null,
            message: ""
        }

        this.error = {
            inputLogic: null,
            messageLogic: null,
            message: ""
        }

        this.regexList = []
    }

    /**
     * à la condition d'un succès ajoute une classe à l'input et au message et assigne son contenu
     * @param {String} inputClass nom de la classe à ajouter sur l'input
     * @param {String} messageClass nom de la class à ajouter sur l'input
     * @param {String} message contenu de l'élément message
     */
    onsuccess(inputLogic, messageLogic, message) {

        if (typeof inputLogic != "string" && typeof inputLogic != "function") throw new Error("Le premier argument doit être de type string ou de type function")
        if (typeof messageLogic != "string" && typeof messageLogic != "function") throw new Error("Le second argument doit être de type string ou de type function")

        if (inputLogic != "") this.success.inputLogic = inputLogic
        if (messageLogic != "") this.success.messageLogic = messageLogic
        if (message != "") this.success.message = message
    }

    /**
     * à la condition d'une erreur ajoute une classe à l'input et au message et assigne son contenu
     * @param {String|Function} inputLogic nom de la classe ou callback à ajouter sur l'input
     * @param {String|Function} messageLogic nom de la classe ou callback à ajouter sur l'input
     * @param {String} message contenu de l'élément message
     */
    onerror(inputLogic, messageLogic, message) {

        if (typeof inputLogic != "string" && typeof inputLogic != "function") throw new Error("Le premier argument doit être de type string ou de type function")
        if (typeof messageLogic != "string" && typeof messageLogic != "function") throw new Error("Le second argument doit être de type string ou de type function")

        if (inputLogic != "") this.error.inputLogic = inputLogic
        if (messageLogic != "") this.error.messageLogic = messageLogic
        if (message != "") this.error.message = message
    }

    check() {
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
    set(inputStr, messageStr, eventType, link = false) {

        const input = document.querySelector(inputStr)
        const message = input.parentElement.querySelector(messageStr)

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
                const isSuccess = IVI.regexList.every(regex => regex.test(this.value))
                if (isSuccess) {
                    if (IVI.success.message != "") IVI.message.innerHTML = IVI.success.message
                    if (IVI.success.inputLogic != null) {
                        if (typeof IVI.success.inputLogic == "string") {
                            if (IVI.success.inputLogic) IVI.input.classList.remove(IVI.error.inputLogic)
                            IVI.input.classList.add(IVI.success.inputLogic)
                        }
                        else IVI.success.inputLogic.call(IVI.input)
                    }
                    if (IVI.success.messageLogic != null) {
                        if (typeof IVI.success.messageLogic == "string") {
                            if (IVI.success.messageLogic) IVI.message.classList.remove(IVI.error.messageLogic)
                            IVI.input.classList.add(IVI.success.messageLogic)
                        }
                        else IVI.success.messageLogic.call(IVI.message)
                    }
                } else {
                    console.log(IVI.message)
                    if (IVI.error.message != "") IVI.message.innerHTML = IVI.error.message
                    if (IVI.error.inputLogic != null) {
                        if (typeof IVI.error.inputLogic == "string") {
                            if (IVI.error.inputLogic) IVI.input.classList.remove(IVI.success.inputLogic)
                            IVI.input.classList.add(IVI.error.inputLogic)
                        }
                        else IVI.error.inputLogic.call(IVI.input)
                    }
                    if (IVI.error.messageLogic != null) {
                        if (typeof IVI.error.messageLogic == "string") {
                            if (IVI.error.messageLogic) IVI.message.classList.remove(IVI.success.messageLogic)
                            IVI.input.classList.add(IVI.error.messageLogic)
                        }
                        else IVI.error.messageLogic.call(IVI.message)
                    }
                }
            })
        }
    }

}