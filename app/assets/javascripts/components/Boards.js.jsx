var Boards = React.createClass({
  getInitialState: function() {
    return {boards: this.props.boards}
  },
  getDefaultState: function() {
    return  {boards: []}
  },
  addBoard: function(e) {
    e.preventDefault();
    var self = this;
    $.ajax({
      url: '/boards',
      type: 'POST',
      data: { board: { name: this.refs.boardName.value } },
      success: function(data) {
        var boards = self.state.boards;
        boards.push(data);
        self.refs.boardName.value = '';
        self.setState({boards: boards})
      }
    });
  },
  deleteBoard: function(id) {
    var self = this;
    $.ajax({
      url: '/boards/' + id,
      type: 'DELETE',
      success: function(data) {
        self.setState({ boards: data });
        }
    });
  },
  toggleBoard: function(id) {
    this.setState({ boardId: id, listView: !this.state.listView })
  },
  displayBoards: function() {
    if(this.state.boards.length) {
      var boards = [];
      for(var i = 0; i < this.state.boards.length; i++ ) {
        var board = this.state.boards[i];
        var key = 'board-' + board.id;
        boards.push(<Board toggleBoard={this.toggleBoard} id={board.id} key={key} name={board.name} deleteBoard={this.deleteBoard} />);
      }
    } else {
      return(<h3>No Boards Found. Please Add One!</h3>)
    }
    return boards;
  },
  showBoards: function() {
    return(<div>
            <div>
              <div className='row'>
                <form onSubmit={this.addBoard}>
                  <div className='input-field'>
                    <input className='col s10' required='true' type='text' autoFocus='true' placeholder='Board Name' ref='boardName' />
                    <button type='submit' className='btn waves-effect right'>Add Board</button>
                  </div>
                </form>
              </div>
            </div>
              <div className='row'>
                {this.displayBoards()}
              </div>
            </div>
          );
  },
  showBoardLists: function() {
    return(<Lists boardId={this.state.boardId} toggleBoard={this.toggleBoard} />);
  },
  render: function() {
    if(this.state.listView){
      return this.showBoardLists();
    } else {
      return this.showBoards();
    }
  }
});