var List = React.createClass({
  getInitialState: function() {
    return { items: [] }
  },
  componentDidMount: function() {
    this.refreshList();
  },
  refreshList: function() {
    var self = this;
    $.ajax({
      url: '/items',
      type: 'GET',
      data: {list_id: this.props.id},
      success: function(data) {
        self.setState(data);
      }
    });
  },
  showAddform: function() {
    this.setState({showAdd: !this.state.showAdd });
  },
  addItemName: function(e) {
    this.setState({itemName: e.currentTarget.value});
  },
  submitItem: function(e) {
    e.preventDefault();
    var self = this;
    $.ajax({
      url: '/items',
      type: 'POST',
      data: { list_id: this.props.id, item: {name: this.state.itemName }},
      success: function(data) {
        var items = self.state.items;
        items.push(data);
        self.setState({items: items, showAdd: false, itemName: null});
      }
    });
  },
  addItemform: function() {
    if(this.state.showAdd) {
      return(<div>
              <form onSubmit={this.submitItem}>
                <div className='input-field'>
                  <input autoFocus='true' placeholder='Item Name' type='text' onChange={this.addItemName} />
                  <button className='btn waves-effects' type='submit'>Submit</button>
                </div>
              </form>
             </div>);
    }
  },
  displayItems: function() {
    var items = [];
    for(var i = 0; i < this.state.items.length; i++ ){
      var item = this.state.items[i];
      var key = "item-" + item.id;
      items.push(<Item listId={this.props.id} refreshList={this.refreshList} key={key} id={item.id} url={item.url} name={item.name} complete={item.complete} />);
    }
    return items;
  },
  deleteList: function() {
    var self = this
    $.ajax({
      url: '/lists/' + this.props.id,
      type: 'DELETE',
      data: {id: this.props.id},
      success: function() {
        self.props.fetchLists();
      }
    });
  },
  render: function() {
    return (<div>
              <div className='card blue-grey darken-1'>
                <div className='card-content white-text'>
                  <span className='card-title'>{this.props.name}</span>
              <a className='waves-effect waves-light btn-floating right' onClick={this.deleteList}><i className='material-icons'>delete</i></a>
              <a className='waves-effect waves-light btn right' onClick={this.showAddform}>Add Item</a>
              {this.addItemform()}
                  <ul>
                  {this.displayItems()}
                  </ul>
                </div>
              </div>
            </div>);
  }
});