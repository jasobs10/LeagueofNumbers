class ChallengersController < ApplicationController

  def index
    # debugger
    array1 = params[:array]
    name = params[:nameArray]
    # rank = params[:rankArray]
    hash = {}
    array1.each_with_index do |sum_id, i|
      # debugger
      result = Net::HTTP.get(URI.parse("https://na.api.riotgames.com/api/lol/NA/v1.3/stats/by-summoner/#{sum_id}/ranked?season=SEASON2017&api_key=#{key}"))
      result2 = JSON.parse(result).entries
      # debugger

      if result2 && result2[2] && result2[2][1]
        hash[sum_id] = result2[2][1].select { |x| x["id"] == 0 }.last
        hash[sum_id]["name"] = name[i]
        # hash[sum_id]["rank"] = rank[i]
      end
      # hash[sum_id] = result2
      # debugger

    end
    # json_hash = hash.to_json
    File.open("public/matches3.json","w") do |f|
      f.write(JSON.pretty_generate(hash))
      # f.write(hash.to_json)
    end

    render json: hash
  end

  def challenger_params
    params.require(:challenger).permit(:array)
  end

end
