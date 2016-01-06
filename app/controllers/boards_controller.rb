class BoardsController < ApplicationController
  def index
    @boards = Board.all.order(:created_at)
  end

  def create
    board = Board.create(board_params)
    render json: board
  end

  def destroy
    board = Board.find(params[:id])
    board.destroy
    render json: Board.all.order(:created_at)
  end

  private
    def board_params
      params.require(:board).permit(:name)
    end
    
end
