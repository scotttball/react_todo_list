var Item = React.createClass({
  getInitialState: function() {
    return { edit: false };
  },
  toggleEdit: function() {
    this.setState({ edit: !this.state.edit });
  },
  checkItem: function() {
    var self = this
    $.ajax({
      url: '/check_item',
      type: 'PUT',
      data: { list_id: this.props.listId, item: { complete: !this.props.complete }, id: this.props.id },
      success: function() {
        self.props.refreshList();
      }
    });
  },
  updateItem: function(e) {
    e.preventDefault();
    var self = this;
    $.ajax({
      url: this.props.url,
      type: 'PUT',
      data: { list_id: this.props.listId, item: {name: this.refs.itemName.value}},
      success: function() {
        self.setState({edit: false});
        self.props.refreshList();
      }
    });
  },
  deleteItem: function() {
    var self = this;
    $.ajax({
      url: this.props.url,
      type: 'DELETE',
      data: {list_id: this.props.listId},
      success: function(data) {
        self.props.refreshList();
      }
    });
  },
  item: function() {
    var id = "item-" + this.props.id;
    var checked = this.props.complete ? 'checked' : '';
    var itemClass = 'col s6 ' + checked;
    return(<li>
            <div className='row'>
              <div className={itemClass}>
                {this.props.name}
              </div>
              <div onClick={this.checkItem} className='col s2'>
                <input type='checkbox' id={id} defaultChecked={this.props.complete} />
                <label htmlFor={id}>Completed</label>
              </div>
              <div onClick={this.toggleEdit} className='col s2'>
              <a className="btn-floating right white-text" id={id}><i className="material-icons">edit</i></a>
              </div>
              <div onClick={this.deleteItem} className='col s2'>
              <a className="btn-floating right darken-2 white-text" id={id}><i className="material-icons">delete</i></a>
              </div>
            </div>
          </li>);
  },
  edit: function() {
    return(<li>
            <div className='row'>
                <form onSubmit={this.updateItem}>
                <div className='col s8'>
                  <input autoFocus={true} type='text' defaultValue={this.props.name} ref='itemName' />
                </div>
                <div className='col s2'>
                  <button className='btn right darken-2 white-text' type="submit">Submit</button>
                </div>
                <div className='col s2'>
                  <a onClick={this.toggleEdit} className='btn-floating right darken-2 white-text'><i className="material-icons">close</i></a>
                </div>
                </form>
            </div>
          </li>);
  },
  render: function() {
    if(this.state.edit) {
      return this.edit();
    } else {
      return this.item();
    }
  }
});