class SummonersController < ApplicationController

  # debugger
  def index
    debugger
    # result = Net::HTTP.get(URI.parse('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/justkatarina?api_key=RGAPI-28a9f378-6242-43bb-b322-989c1585566f'))
    # # debugger
    # render json: result
    if params[:name]
      result = Net::HTTP.get(URI.parse("https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/#{params[:name]}?api_key=#{key}"))
      render json: result
    end
  end

  def show


    result = Net::HTTP.get(URI.parse("https://na1.api.riotgames.com/lol/summoner/v3/summoners/#{params[:id]}?api_key=#{key}"))
    render json: result

  end

end
