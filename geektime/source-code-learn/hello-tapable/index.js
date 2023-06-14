const { sync } = require("glob-all");
const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");


const helloSyncHook = async () => {
    const hook = new SyncHook(["t3wt","qwe"]);


    const calls = [];
    hook.tap("Hello World", () => calls.push("Hello"));

    //call
    hook.call("1", 2);
    //promise
    await hook.promise("b", "c");
    console.log(calls);

    const register = () => {
        console.log("register called");
        return {
            name: "huh",
            type: "sync",
            fn: () => calls.push("World")
        }
    };
    const interceptCall = () => {
        console.log("intercept call called");
    }

    //intercept
    hook.intercept({
        call: interceptCall,
        register: register
    });

    hook.call(3, 4);
    console.log(calls);

    hook.tap("learn webpack", a => calls.push("webpack"));
    hook.call(5,6);
    console.log(calls);
}

// helloSyncHook().then(() => {
//     console.log("done");
// })

const helloSyncBailHook = async () => {
    const syncBailHook = new SyncBailHook(["a","b"]);

    //no tap yet, won't trigger anything.
    syncBailHook.call(1);

    syncBailHook.tap("Hello", a => {
        console.log("Hello tap was called");
        return "Hello"
    });

    // syncBailHook.call(2,3,4);
    // await syncBailHook.promise(5);

    syncBailHook.tap("World", a => {
        console.log("World tap was called (should not be called)");
        return "World"
    });
    const result = syncBailHook.call(6);
    const result2 = await syncBailHook.promise(7);
    const result3 = await syncBailHook.promise(8);
    console.log(result, result2, result3);
}   

// helloSyncBailHook().then(() => {
//     console.log("done - helloSyncBailHook");
// })


const helloAsyncParallelHook = async () => {

    const asyncParallelHook = new AsyncParallelHook(['data']);
    // await asyncParallelHook.runAsync(result.async, "callAsync");
	// await asyncParallelHook.runAsync(result.async, "promise");
    asyncParallelHook.tapAsync("First API call", (data, callback) => {
       setTimeout(() => {
        console.log("First API call:", data);
        callback();
       }, 1000);
    });
    asyncParallelHook.tapPromise("Second API call", (data) => {
        return new Promise(() => setTimeout(() => {
            console.log("Second API call:", data);
        }));
    });
    // await asyncParallelHook.callAsync(()=> console.log("cb was called"));
    // await asyncParallelHook.promise();
    await asyncParallelHook.callAsync('data', () => {
        console.log("All API completed");
    })
}

helloAsyncParallelHook().then(() => {
    console.log("done - helloAsyncParallelHook - the second should be completed earlier");
});

const helloAsyncSeriesHook = async () => {
    const asyncSeriesHook = new AsyncSeriesHook(['data']);

    asyncSeriesHook.tapAsync("First API call", (data, callback) => {
        setTimeout(() => {
         console.log("First API call:", data);
         callback();
        }, 1000);
     });
     asyncSeriesHook.tapPromise("Second API call", (data) => {
         return new Promise(() => setTimeout(() => {
             console.log("Second API call:", data);
         }));
     });
     await asyncSeriesHook.callAsync('data', () => {
        console.log("All API completed");
     })
}

helloAsyncSeriesHook().then(() => {
    console.log("done - helloAsyncSeriesHook - the second should be completed earlier but callback will be triggered later, because following series");
});








