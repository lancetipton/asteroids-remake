class PlayersController < ApplicationController
  before_filter :access_control

  def index
    player = Player.all.first
    render :json => {player: player}
  end



  def access_control
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'GET, POST, DELETE'
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
  end

end
