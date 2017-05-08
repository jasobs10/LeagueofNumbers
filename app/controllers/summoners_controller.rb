class SummonersController < ApplicationController

  # debugger
  def index
    if params[:name]

      name_url = params[:name].gsub(/\s+/, "")
      summoner = Net::HTTP.get(URI.parse("https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/#{name_url}?api_key=#{key}"))
      summoner2 = JSON.parse(summoner)
      sum_id = summoner2["id"]
      name = params[:name]
      matches =  Net::HTTP.get(URI.parse("https://na.api.riotgames.com/api/lol/NA/v1.3/stats/by-summoner/#{sum_id}/ranked?season=SEASON2017&api_key=#{key}"))
      matches2 = JSON.parse(matches).entries
      hash = {}
      hash = matches2[2][1].select { |x| x["id"] == 0 }.last
      hash["name"] = name
      hash["sum_id"] = sum_id
      hash["rank"] = "N/A"


      # debugx/ger
      render json: hash
    end
  end

  def show


    result = Net::HTTP.get(URI.parse("https://na1.api.riotgames.com/lol/summoner/v3/summoners/#{params[:id]}?api_key=#{key}"))
    render json: result

  end

end
