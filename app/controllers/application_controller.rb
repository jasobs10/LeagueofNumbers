class ApplicationController < ActionController::Base
  require 'net/http'
  protect_from_forgery with: :exception
  helper_method :key

  def key
    "RGAPI-a1ee4c59-a850-44e6-9729-35549b1536d5"
  end
end
