import { renderTodos, clearNewTodoInput, getTodoId, showNotification, showDeleteConfirmDialog, closeDeleteConfirmDialog } from "./ui"
import { getAllTodos, addTodo, removeTodo, updateTodo } from "./data";
import { trim } from "./helpers";
import { capitalize } from "lodash-es";

export function onLoadEventHandler() {
    renderTodos(getAllTodos())
}

export function newTodoEventHandler(event) {
    let text = event.target.value
    //Using Experimenal JavaScript Features that will handled by bable plugin.
    //@babel/plugin-proposal-pipeline-operator
    text = text |> trim |> capitalize
    addTodo({
        id: Date.now(),
        text: text,
        completed: false
    })
    renderTodos(getAllTodos())
    clearNewTodoInput()
    showNotification()
}

export async function removeTodoEventHandler(event) {
    // const id = getTodoId(event.target)
    // removeTodo(id)
    // renderTodos(getAllTodos())
    // renderConfirmDelete()

    //[Dynamic Import]
    const [{ Modal }, { default: $ }] = await Promise.all([
        import(
            'bootstrap'
            //the comment below is very important, otherwise the bundle name is random number
            //https://github.com/gregberge/loadable-components/issues/137
            /* webpackChunkName: "bootstrap" */
        ),
        import(
            'jquery'
            /* webpackChunkName: "jquery" */
        )
    ])
    const id = getTodoId(event.target)
    $('#modal-delete-button').data('todo-id', id)
    const deleteToDoModal = Modal.getOrCreateInstance(
        document.getElementById('modal-delete-todo')
    )
    deleteToDoModal.show();
}

export async function confirmRemoveEventHandler(event) {
    //[Dynamic Import]
    const [{ Modal }, { default: $ }] = await Promise.all([
        import(
            'bootstrap'
            //the comment below is very important, otherwise the bundle name is random number
            //https://github.com/gregberge/loadable-components/issues/137
            /* webpackChunkName: "bootstrap" */
        ),
        import(
            'jquery'
            /* webpackChunkName: "jquery" */
        )
    ])
    const id = $('#modal-delete-button').data('todo-id')
    removeTodo(id)
    renderTodos(getAllTodos())
    const deleteToDoModal = Modal.getOrCreateInstance(
        document.getElementById('modal-delete-todo')
    )
    deleteToDoModal.hide();
}

export async function cancelRemoveEventHandler() {
    const [{ Modal }] = await Promise.all([
        import(
            'bootstrap'
            //the comment below is very important, otherwise the bundle name is random number
            //https://github.com/gregberge/loadable-components/issues/137
            /* webpackChunkName: "bootstrap" */
        ),
        import(
            'jquery'
            /* webpackChunkName: "jquery" */
        )
    ])
    const deleteToDoModal = Modal.getOrCreateInstance(
        document.getElementById('modal-delete-todo')
    )
    deleteToDoModal.hide();
}

export function toggleTodoEventListener(event) {
    const id = getTodoId(event.target)
    const isCompleted = event.target.checked
    updateTodo(id, isCompleted)
    renderTodos(getAllTodos())
}
