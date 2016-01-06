var Board = React.createClass({
  loadBoard: function() {
    this.props.toggleBoard(this.props.id)
  },
  render: function() {
    return(<div className='col s4'>
              <div className='row'>
                <div className='card blue-grey darken-1'>
                  <div onClick={this.loadBoard} className='card-content white-text'>
                    <span className='card-title'>{this.props.name}</span>
                  </div>
                  <div className='card-action'>
                    <a className='btn-floating white-text' onClick={ () => this.props.deleteBoard(this.props.id)} ><i className='material-icons'>delete</i></a>
                  </div>
                </div>
              </div>
            </div>);
  }
});