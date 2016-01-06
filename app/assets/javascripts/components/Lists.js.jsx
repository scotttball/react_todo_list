var Lists = React.createClass({
  getInitialState: function() {
    return {lists: []}
  },
  componentDidMount: function() {
    this.fetchLists();
  },
  fetchLists: function() {
    var self = this;
    $.ajax({
      url: '/lists',
      type: 'GET',
      data: {id: this.props.boardId},
      success: function(data) {
        self.setState(data);
      }
    });
  },
  showAddForm: function() {
    this.setState({ showAdd: !this.state.showAdd });
  },
  submitList: function(e) {
    e.preventDefault();
    self = this
    $.ajax({
      url: '/lists',
      type: 'POST',
      data: {id: this.props.boardId, list: {name: this.refs.listName.value }},
      success: function(data) {
        var lists = self.state.lists;
        lists.push(data);
        self.refs.listName.value = '';
        self.setState({lists: lists, showAdd: false});
      }
    });
  },
  addListForm: function() {
    if(this.state.showAdd) {
      return(<div>
              <form onSubmit={this.submitList}>
                <div className='input-field'>
                  <input type='text' placeholder='List Name' autofocus='true' ref='listName' />
                  <button type='submit' className='waves-effect btn'>Add List</button>
                </div>
              </form>
             </div>)
    }
  },
  displayLists: function() {
    var lists = [];
    for(var i = 0; i < this.state.lists.length; i++) {
      var list = this.state.lists[i];
      var key = 'list-' + list.id;
      lists.push(<List fetchLists={this.fetchLists} key={key} id={list.id} name={list.name} />);

    }
    return lists;
  },
  render: function() {
      return(<div>
              <div className='row'>
                <a className='waves-effect btn left' onClick={this.props.toggleBoard}>Back to Boards</a>
                <a className='waves-effect btn-floating right' onClick={this.showAddForm}><i className='material-icons'>add</i></a>
                  {this.addListForm()}
              </div>
                <div className='row'>
                  {this.displayLists()}
                </div>
             </div>)
  }
});