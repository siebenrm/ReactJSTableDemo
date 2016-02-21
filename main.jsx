var React = require ('react');
var ReactDOM = require ('react-dom');
var DemoTable = require ('./src/jsx/demo-table.jsx');
var $ = require ('jquery');
window.jQuery = $;

var Main = React.createClass ({
    componentDidMount: function () {
    },  
    render: function () {
        return (
            <DemoTable></DemoTable>
        );
    }
});

ReactDOM.render (<Main />, document.getElementById ('app'));