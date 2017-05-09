class SummonersController < ApplicationController

  # debugger
  def index
    # debugger
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

    if params[:random]
      # debugger
      result = Net::HTTP.get(URI.parse("https://na1.api.riotgames.com/lol/league/v3/masterleagues/by-queue/RANKED_SOLO_5x5?api_key=#{key}"))
      first = JSON.parse(result)["entries"].sample["playerOrTeamId"]
      name = JSON.parse(result)["entries"].sample["playerOrTeamName"]
      stats = Net::HTTP.get(URI.parse("https://na.api.riotgames.com/api/lol/NA/v1.3/stats/by-summoner/#{first}/ranked?season=SEASON2017&api_key=#{key}"))
      matches2 = JSON.parse(stats).entries
      hash = {}
      hash = matches2[2][1].select { |x| x["id"] == 0 }.last
      hash["name"] = name
      hash["sum_id"] = first
      hash["rank"] = "N/A"

      render json: hash

    end
  end

  def show


    result = Net::HTTP.get(URI.parse("https://na1.api.riotgames.com/lol/summoner/v3/summoners/#{params[:id]}?api_key=#{key}"))
    render json: result

  end

end
