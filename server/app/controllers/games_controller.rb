class GamesController < ApplicationController
  before_filter :access_control


  def show

  end

  def update
    game = Game.find(params['id'])
    p params['score']
    game.score += params['score'].to_i
    game.save
    render :json => {game: game}
  end



  def access_control
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE'
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
    headers['Access-Control-Request-Method'] = 'GET, PUT, POST, OPTIONS'
  end

end
