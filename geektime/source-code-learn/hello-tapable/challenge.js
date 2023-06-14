class MySyncHook {

    args = [];
    taps = [];
    constructor(...args) {
        this.args = args;
    }

    tap(name, callback) {
        const newtap = {
            name,
            callback
        }
        this.taps.push(newtap);
    }

    call(...args) {
        this.taps.forEach(tap => {
            tap.callback(...args);
        });
    }
}


const testHook = () => {
    const hook = new MySyncHook(["1",2, 3]);
    hook.tap("hello", (a) => console.log("hello called", a));
    hook.tap("world", (a) => console.log("world called", a));

    hook.call("4");
}

testHook();



