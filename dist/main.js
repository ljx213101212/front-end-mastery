/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("let data = [\n    {\n        \"id\": 1560865205317,\n        \"text\": \"Buy eggs\",\n        \"completed\": false\n    },\n    {\n        \"id\": 1560865205318,\n        \"text\": \"Do 15 min exercise\",\n        \"completed\": false\n    }\n]\n\nfunction getAllTodos() {\n    return data\n}\n\nfunction addTodo(todo) {\n    data.push(todo)\n}\n\nfunction removeTodo(id) {\n    data = data.filter(function (item) {\n        return item.id !== id\n    })\n}\n\nfunction updateTodo(id, completed) {\n    const itemIndex = data.findIndex(function (value) {\n        return value.id === id\n    })\n    data[itemIndex].completed = completed\n}\n\nfunction renderTodos(todos) {\n    const renderedItemArray = todos.map(function (todo) {\n        const className = todo.completed ? 'completed' : ''\n        const completionClass = todo.completed ? 'checked' : ''\n        return `\n            <li data-id=\"${todo.id}\" class=\"${className}\">\n                <span class=\"custom-checkbox\">\n                    <img class=\"check\" src=\"./images/checkmark.svg\" width=\"22\" height=\"22\"></img>\n                    <input class=\"real-checkbox\" type=\"checkbox\" ${completionClass} />\n                </span>\n                <label>${todo.text}</label>\n                <span class=\"delete\"></span>\n            </li>\n        `\n    })\n    document.querySelector('.todo-list').innerHTML = renderedItemArray.join('')\n}\n\nfunction clearNewTodoInput() {\n    document.querySelector('.new-todo').value = ''\n}\n\nfunction getTodoId(element) {\n    return parseInt(\n        element.dataset.id\n        || element.parentNode.dataset.id\n        || element.parentNode.parentNode.dataset.id\n        , 10)\n}\n\nfunction onLoadEventHandler() {\n    renderTodos(getAllTodos())\n}\n\nfunction newTodoEventHandler(event) {\n    let text = event.target.value\n    addTodo({\n        id: Date.now(),\n        text: text,\n        completed: false\n    })\n    renderTodos(getAllTodos())\n    clearNewTodoInput()\n}\n\nfunction removeTodoEventHandler(event) {\n    const id = getTodoId(event.target)\n    removeTodo(id)\n    renderTodos(getAllTodos())\n}\n\nfunction toggleTodoEventListener(event) {\n    const id = getTodoId(event.target)\n    const isCompleted = event.target.checked\n    updateTodo(id, isCompleted)\n    renderTodos(getAllTodos())\n}\n\nwindow.addEventListener('load', onLoadEventHandler)\ndocument.addEventListener('change', function (event) {\n    if (event.target.classList.contains('new-todo')) {\n        newTodoEventHandler(event)\n    }\n})\ndocument.addEventListener('click', function (event) {\n    if (event.target.classList.contains('delete')) {\n        removeTodoEventHandler(event)\n    }\n    if (event.target.classList.contains('real-checkbox')) {\n        toggleTodoEventListener(event)\n    }\n})\n\n//# sourceURL=webpack://webpack5-2022/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;