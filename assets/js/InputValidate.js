class InputValidateItem {

    constructor(input, message, eventType, link = false) {

        if (input.constructor.name != "HTMLInputElement" && input.constructor.name != "HTMLTextAreaElement" && input.constructor.name != "HTMLSelectElement") throw new Error("L'input n'est pas de type champ de formulaire")
        if (!(message instanceof HTMLElement)) throw new Error("Le message doit être un élément HTML")
        if (link && !(link instanceof InputValidateItem)) throw new Error("Le lien n'est pas une instance de InputValidateItem")

        this.input = input
        this.message = message
        this.eventType = eventType
        this.link = link

    }

    /**
     * à la condition d'un succès ajoute une classe à l'input et au message et assigne son contenu
     * @param {String} inputClass nom de la classe à ajouter sur l'input
     * @param {String} messageClass nom de la class à ajouter sur l'input
     * @param {String} message contenu de l'élément message
     */
    onsuccess(inputLogic, messageLogic) {

        if (typeof inputLogic != "string" && !Array.isArray(inputLogic)) throw new Error("Le premier argument doit être de type string ou de type array")
        if (typeof messageLogic != "string" && !Array.isArray(messageLogic)) throw new Error("Le second argument doit être de type string ou de type array")

        if (inputLogic != "") this.success.inputLogic = inputLogic
        if (messageLogic != "") this.success.messageLogic = messageLogic
    }

    /**
     * à la condition d'une erreur ajoute une classe à l'input et au message et assigne son contenu
     * @param {String|Function} inputLogic nom de la classe ou callback à ajouter sur l'input
     * @param {String|Function} messageLogic nom de la classe ou callback à ajouter sur l'input
     * @param {String} message contenu de l'élément message
     */
    onerror(inputLogic, messageLogic) {

        if (typeof inputLogic != "string" && typeof inputLogic != "function") throw new Error("Le premier argument doit être de type string ou de type function")
        if (typeof messageLogic != "string" && typeof messageLogic != "function") throw new Error("Le second argument doit être de type string ou de type function")

        if (inputLogic != "") this.error.inputLogic = inputLogic
        if (messageLogic != "") this.error.messageLogic = messageLogic
    }

    test(successMessage, errorList) {
        
        if(typeof successMessage != "string") throw new Error("Le premier argument doit être une string")
        if(!errorList) throw new Error("Il faut au minimum un array comme second argument avec un object contenant id et test")

        for(const error of errorList) {
            if(!error.test || !error.message) {
                throw new Error("L'item n° " + i + " n'est pas formaté de la bonne manière. Nécessite les propriétés test et message")
            }
        }


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
        }
    }

}