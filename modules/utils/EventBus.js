const eventCallbacksPairs = [];



export class EventBus {
    /**
     * Recherche un eventCallbacksPair dans l'array eventCallbacksPairs
     * @param String eventType
     * @return {EventCallbacksPair ou undefined si non trouvé}
     */
    static findEventCallbacksPair(eventType){
        return eventCallbacksPairs.find(eventObject => eventObject.eventType === eventType);
    }

    /**
     * Inscription d'events et de leurs callbacks
     * @param String eventType
     * @param Function callback
     * @return void
     */
    static subscribe(eventType, callback){
        const eventCallbacksPair = this.findEventCallbacksPair(eventType);
        if(eventCallbacksPair){
            // Ajout d'un callback sur un event déjà existant
            eventCallbacksPair.callbacks.push(callback);
        }else{
            //Ajout d'un event et du callback associé
            eventCallbacksPairs.push(new EventCallbacksPair(eventType, callback));
        }
    }

    /**
     * Déclenche l'execution des callbacks de l'event appelé
     * @param String eventType
     * @param Mixed args
     * @return void
     */
    static post(eventType, args){
        const eventCallbacksPair = this.findEventCallbacksPair(eventType);
        if(!eventCallbacksPair){
            console.error("Subscriber for event:'"+eventType+"' Not found");
            return;
        }else{
            eventCallbacksPair.callbacks.forEach(callback => callback(args));
        }
    }
}

class EventCallbacksPair {
    constructor(eventType, callback){
        this.eventType = eventType;
        this.callbacks = [callback];
    }
}