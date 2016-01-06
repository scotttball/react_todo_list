class ListsController < ApplicationController
  before_action :board, except: [:destroy]
  
  def index
    @lists = @board.lists
  end

  def create
    @list = @board.lists.create(list_params)
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy
    head :ok
  end


  private

    def board
      @board = Board.find(params[:id])
    end

    def list_params
      params.require(:list).permit(:name, :percent_complete)
    end
end
