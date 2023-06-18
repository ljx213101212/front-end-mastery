const App = () => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = 'From Remote App (App2)';
    buttonElement.addEventListener('click', () => {
        alert('Button clicked!');
    });
    return buttonElement;
}

export default App;