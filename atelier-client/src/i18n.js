// for lint
/*global
 initialData
 */
import {messagesFr} from './messages-fr';
import {messagesEn} from './messages-en';

const confLang = initialData.language;

let usedMessages = [];
export function i18n(message) {
    let localMess = messages[message];

    // mettre les conf lang dans une const
    if (confLang == 'TU') {
        if(localMess == null) {
            throw new Error(`[i18n] ${message} missing in i18n messages.`);
        }
        return message;
    }
    if (localMess == null) {
        console.log(`[i18n] ${message} missing in i18n messages.`);
        localMess = '??????';
    }
    usedMessages.push(message);
    return localMess;
}

let messages;
switch (confLang) {
    case 'fr':
        messages = messagesFr;
        break;
    case 'en':
        messages = messagesEn;
        break;
    case 'test':
    default:
        messages = messagesFr;
        // Pour détecter les strings non passées à l'i18n
        Object.keys(messages).forEach(function (key) {
            messages[key] = '------------';
        });
}
