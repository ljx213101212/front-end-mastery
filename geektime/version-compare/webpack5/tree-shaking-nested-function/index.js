import { something } from "./something";

function usingSomething() {
    return something;
}

export function test() {
    return usingSomething();
}