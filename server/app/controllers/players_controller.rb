class PlayersController < ApplicationController
  before_filter :access_control

  def index

    player = Player.find_by(:name => params['name'])

    if check_password(player, params['password'])
      games = player.games.all
      render :json => {player: player, games: games}
    end

  end

  def create
    player = Player.new(:name => params['name'], :password => params['password'])
    if player.save
      game = Game.new(:game => params['game'], :score => 10, player_id: player.id )
      if game.save
        games = player.games.all
        render :json => {player: player, games: games}
      end
    end

  end



  def access_control
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'GET, POST, DELETE'
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
  end

private
  def check_password(player, password)
    if player.password == password
      true
    else
      false
    end
  end


end
