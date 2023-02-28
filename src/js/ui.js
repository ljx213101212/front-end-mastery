import "../styles/vendors.scss";
import styles from "../styles/notification.module.less";
import { getMotivationalPictures } from "./api";
import { css } from "@emotion/css";

const checkboxSize = "30px";
//CSS-in-JS
const checkboxCssInJsSample = css`
  width: ${checkboxSize};
  height: ${checkboxSize};
  cursor: pointer;
  opacity: 0;
  position: absolute;
  top: -3px;
  left: -5px;
`;

export function renderTodos(todos) {
    const renderedItemArray = todos.map(function (todo) {
        const className = todo.completed ? "completed" : "";
        const completionClass = todo.completed ? "checked" : "";
        return `
            <li data-id="${todo.id}" class="${className}">
                <span class="custom-checkbox">
                    <img class="check" src="../images/checkmark.svg" width="22" height="22"></img>
                    <input class="real-checkbox ${checkboxCssInJsSample}" type="checkbox" ${completionClass} />
                </span>
                <label>${todo.text}</label>
                <span class="delete"></span>
            </li>
        `;
    });
    document.querySelector(".todo-list").innerHTML = renderedItemArray.join("");
    //renderMotivationalPictures();
}

export function clearNewTodoInput() {
    document.querySelector(".new-todo").value = "";
}

export function getTodoId(element) {
    return parseInt(
        element.dataset.id ||
        element.parentNode.dataset.id ||
        element.parentNode.parentNode.dataset.id,
        10
    );
}

export function showNotification() {
    const notification = `<div class="alert alert-success ${styles.notification}">Todo item added</div>`;
    document.body.innerHTML += notification;

    setTimeout(() => {
        const notificationElement = document.querySelector(
            `.${styles.notification}`
        );
        notificationElement.parentNode.removeChild(notificationElement);
    }, 2000);
}

export function renderMotivationalPictures() {
    getMotivationalPictures().then((pictures) => {
        const motivationalPictureHtml = `
            <div class="motivational-pictures">
                ${pictures
                .map((picture) => {
                    return '<img class="header-image" src="' + picture + '" >';
                })
                .join("")}
            </div>
        `;

        const motivationalPictureContainer = document.querySelector(
            `.motivational-pictures-container`
        );
        motivationalPictureContainer.innerHTML = motivationalPictureHtml;
    });
}
