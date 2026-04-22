let onSyncAction: (name: string, value: number) => void;
let remoteStorage: { [key: string]: number } = {};

/**
 * חיבור לרדיו
 */
//% color="#4b7bec" icon="\uf0c9" block="connect to project on group %id"
function connectToProject(id: number): void {
    radio.setGroup(id);
}

/**
 * סנכרון משתנה
 */
//% color="#4b7bec" icon="\uf0c9" block="sync variable %name with value %value"
function syncVariable(name: string, value: number): void {
    radio.sendValue("s:" + name, value);
}

/**
 * בלוק אירוע - הפעם בלי Namespace כדי למנוע שגיאות כפילות
 */
//% color="#4b7bec" icon="\uf0c9" block="on variable received"
//% draggableParameters="reporter"
function onVariableReceived(handler: (name: string, value: number) => void) {
    onSyncAction = handler;
}

// ניהול קבלת הנתונים
radio.onReceivedValue(function (receivedName, receivedValue) {
    if (receivedName.indexOf("s:") == 0) {
        let cleanName = receivedName.substr(2);
        remoteStorage[cleanName] = receivedValue;
        if (onSyncAction) {
            onSyncAction(cleanName, receivedValue);
        }
    }
})

/**
* Gebruik dit bestand om specifieke functies en blokken te definiëren.
* Lees meer op https://makecode.microbit.org/blocks/custom
*/

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace custom {
    /**
     * TODO: describe your function here
     * @param n describe parameter here, eg: 5
     * @param s describe parameter here, eg: "Hello"
     * @param e describe parameter here
     */
    //% block
    export function foo(n: number, s: string, e: MyEnum): void {
        // Add code here
    }

    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 5
     */
    //% block
    export function fib(value: number): number {
        return value <= 1 ? value : fib(value -1) + fib(value - 2);
    }
}
