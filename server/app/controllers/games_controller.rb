class GamesController < ApplicationController
  before_filter :access_control


  def show
    game = Game.find(params['id'])
    game.score += params['score'].to_i


  end



  def access_control
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE'
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
  end

end
