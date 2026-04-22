let lastSyncName = ""
let lastSyncValue = 0
let syncHandler: () => void;

/**
 * חיבור לקבוצת רדיו
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
 * בלוק אירוע - נקי לגמרי בלי בלונים ובלי משתנים
 */
//% color="#4b7bec" icon="\uf0c9" block="on received"
function onReceivedSync(handler: () => void) {
    syncHandler = handler;
}

/**
 * שם המשתנה האחרון שהגיע
 */
//% color="#4b7bec" icon="\uf0c9" block="synced name"
function syncedName(): string {
    return lastSyncName;
}

/**
 * ערך המשתנה האחרון שהגיע
 */
//% color="#4b7bec" icon="\uf0c9" block="synced value"
function syncedValue(): number {
    return lastSyncValue;
}

// ניהול קבלת הנתונים
radio.onReceivedValue(function (name, value) {
    if (name.indexOf("s:") == 0) {
        lastSyncName = name.substr(2);
        lastSyncValue = value;
        if (syncHandler) {
            syncHandler();
        }
    }
})
