'use strict'
const box = {
    locked: true,
    unlock() {this.locked = false},
    lock() {this.locked = true},
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    let progress = 0;
    try {
        if (box.locked = true) {
            box.unlock();
            progress ++;
            body();
            box.lock();
            progress = 0;
        }
        else {
            body();
        }
    }
    finally {
        if (progress > 0) {box.lock()}
    }
}

withBoxUnlocked(function() {
    box.content.push("gold piece");
})

try {
    withBoxUnlocked(function() {
        throw new Error("Pirates on the horizon! Abort!");
    });
} catch (e) {
    console.log("Error raised: " + e);
}

console.log(box.locked);
// > True