 // Remote component loading
//  window.RemoteApp.Button()
//  .then(buttonModule => {
//    const hostAppContainer = document.getElementById('hostAppContainer');
//    const buttonElement = buttonModule.default();

//    hostAppContainer.appendChild(buttonElement);
//  })
//  .catch(error => {
//    console.error('Failed to load remote component:', error);
//  });


const RemoteApp = async () => await import("app2/App");

RemoteApp().then(data => {
    const hostAppContainer = document.getElementById('hostAppContainer');
    hostAppContainer.appendChild(data.default())
});

// hostAppContainer.appendChild(RemoteApp());

