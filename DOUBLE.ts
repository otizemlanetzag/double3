let onSyncAction: (name: string, value: number) => void;
let remoteStorage: { [key: string]: number } = {};

/**
 * חיבור לפרויקט בקבוצת רדיו
 */
//% color="#4b7bec" icon="\uf0c9" block="connect to group %id"
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
 * בלוק אירוע - ללא שמות המשתנים בכותרת כדי למנוע שגיאות
 */
//% color="#4b7bec" icon="\uf0c9" block="on received"
//% draggableParameters="reporter"
function onVariableReceived(handler: (name: string, value: number) => void) {
    onSyncAction = handler;
}

// קבלת הנתונים מהרדיו
radio.onReceivedValue(function (receivedName, receivedValue) {
    if (receivedName.indexOf("s:") == 0) {
        let cleanName = receivedName.substr(2);
        remoteStorage[cleanName] = receivedValue;
        if (onSyncAction) {
            onSyncAction(cleanName, receivedValue);
        }
    }
})
