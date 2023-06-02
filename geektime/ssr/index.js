const React = require("react");
// import data from "./data.json";

const App = () => {

    return (
        <div className="application">
            <h1>Show Case for SSR</h1>
            <div>Data from Server</div>
        </div>
    );
};

// export default <App/>;
module.exports = <App/>;
