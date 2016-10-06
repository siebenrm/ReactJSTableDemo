var React = require ('react');
var $ = require ('jquery');

var DemoRow = React.createClass ({
    onClickHandler : function (event) {
        var rowData = null;
        if (event.target.name === 'save') {
            rowData = {
                firstName : $('#firstName' + this.props.index).val(),
                lastName : $('#lastName' + this.props.index).val(),
                email : $('#email' + this.props.index).val()
            };       
        }
        this.props.onClick(event, rowData);
    },
    render : function () {
        return (
            <tr>            
                <td>
                    {this.props.tableRow.mode === 'edit' ? 
                        <input id={'firstName' + this.props.index} className='form-control' maxLength='20' defaultValue={this.props.tableRow.firstName}></input> :
                        this.props.tableRow.firstName}
                </td>
                <td>
                    {this.props.tableRow.mode === 'edit' ? 
                        <input id={'lastName' + this.props.index} className='form-control' maxLength='20' defaultValue={this.props.tableRow.lastName}></input> :
                        this.props.tableRow.lastName}
                </td>
                <td>
                    {this.props.tableRow.mode === 'edit' ? 
                        <input id={'email' + this.props.index} className='form-control' maxLength='60' defaultValue={this.props.tableRow.email}></input> :
                        this.props.tableRow.email}
                </td>
                <td>
                    {this.props.tableRow.mode === 'edit' ? 
                        <span>
                            <button name={'save'}  onClick={this.onClickHandler}  className="btn btn-default btn-block">Save</button>
                            <button name={'cancel'} onClick={this.onClickHandler} className="btn btn-default btn-block">Cancel</button>
                        </span> :
                        <span>
                            <button name={'edit'} onClick={this.onClickHandler} className="btn btn-default btn-block">Edit</button>
                            <button name={'delete'} onClick={this.onClickHandler} className="btn btn-default btn-block">Delete</button>
                        </span>}
                </td>
            </tr>
        );
    }
});

var DemoTable = React.createClass ({
    onClickAddHandler : function (event) {
        var tableRows = this.state.tableRows;
        tableRows.push({firstName: 'New', lastName: 'Row', email: 'newRow@gmail.com',  mode: 'edit'});
        this.setState (tableRows);
    },
    onClickRowHandler : function (index, event, rowData) {
        if (event.target.name === 'cancel') {
            var tableRows = this.state.tableRows;
            tableRows[index].mode = null;
            this.setState (tableRows);
        }
        
        if (event.target.name === 'edit') {
            var tableRows = this.state.tableRows;
            tableRows[index].mode = 'edit';
            this.setState (tableRows);
        }

        if (event.target.name === 'delete') {
            var tableRows = this.state.tableRows;
            delete tableRows[index];
            this.setState (tableRows);
        }

        if (event.target.name === 'save') {
            var tableRows = this.state.tableRows;
            tableRows[index].mode = null;
            tableRows[index].firstName = rowData.firstName;
            tableRows[index].lastName = rowData.lastName;
            tableRows[index].email = rowData.email;
            this.setState (tableRows);
        }
    },
    getInitialState : function () {
        var tableRows=[];
        tableRows.push ({firstName: 'John', lastName: 'Doe', email: 'johnDoe@gmail.com'});
        tableRows.push ({firstName: 'Jane', lastName: 'Doe', email: 'janeDoe@gmail.com'});
        return (
            {tableRows : tableRows}
        );
    },
    render : function () {
        var tableRows = this.state.tableRows.map (function (tableRow, index) {
           var onClickRowHandler = this.onClickRowHandler.bind(this, index);
           return (
               <DemoRow key={index} index={index} tableRow={tableRow} onClick={onClickRowHandler}></DemoRow>
           ); 
        }, this);
        
        return (
            <div className="container-fluid">
                <div className = 'row'>
                    <div className = 'col-md-4 col-md-offset-4'>
                        <h3>React Table Demo</h3>
                    </div>
                </div>
                <div className = 'row'>
                    <div className = 'col-md-12'>
                        <div className="table-responsive">
                            <table className = 'table table-bordered table-striped'>
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Commands</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableRows}               
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className = 'row'>
                    <div className = 'col-md-4'>
                        <button name={'add'} onClick={this.onClickAddHandler} className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DemoTable;