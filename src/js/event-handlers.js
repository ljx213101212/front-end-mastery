import { renderTodos, clearNewTodoInput, getTodoId, showNotification } from "./ui"
import { getAllTodos, addTodo, removeTodo, updateTodo } from "./data";
import { trim, captalize } from "./helpers";

export function onLoadEventHandler() {
    renderTodos(getAllTodos())
}

export function newTodoEventHandler(event) {
    let text = event.target.value
    //Using Experimenal JavaScript Features that will handled by bable plugin.
    //@babel/plugin-proposal-pipeline-operator
    text = text |> trim |> captalize
    addTodo({
        id: Date.now(),
        text: text,
        completed: false
    })
    renderTodos(getAllTodos())
    clearNewTodoInput()
    showNotification()
}

export function removeTodoEventHandler(event) {
    const id = getTodoId(event.target)
    removeTodo(id)
    renderTodos(getAllTodos())
}

export function toggleTodoEventListener(event) {
    const id = getTodoId(event.target)
    const isCompleted = event.target.checked
    updateTodo(id, isCompleted)
    renderTodos(getAllTodos())
}
