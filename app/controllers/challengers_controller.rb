class ChallengersController < ApplicationController

  def index

    challengers = Net::HTTP.get(URI.parse("https://na1.api.riotgames.com/lol/league/v3/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=#{key}"))
    rank = []
    name = []
    challengers2 = JSON.parse(challengers)

    array1 = challengers2["entries"].map do |el|
      name << el["playerOrTeamName"]
      rank << el["leaguePoints"]
      el = el["playerOrTeamId"]
    end

    hash = {}
    dataArray = []
    array1.each_with_index do |sum_id, i|

      result = Net::HTTP.get(URI.parse("https://na.api.riotgames.com/api/lol/NA/v1.3/stats/by-summoner/#{sum_id}/ranked?season=SEASON2017&api_key=#{key}"))
      result2 = JSON.parse(result).entries


      if result2 && result2[2] && result2[2][1]
        hash[sum_id] = result2[2][1].select { |x| x["id"] == 0 }.last
        hash[sum_id]["name"] = name[i]
        hash[sum_id]["sum_id"] = sum_id
        hash[sum_id]["rank"] = rank[i]
        dataArray << hash[sum_id]

      end


    end

    File.open("public/matches.json","w") do |f|
      f.write(JSON.pretty_generate(dataArray))

    end

    render json: hash
  end

  def challenger_params
    params.require(:challenger).permit(:array)
  end

end
