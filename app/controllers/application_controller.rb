class ApplicationController < ActionController::Base
  require 'net/http'
  protect_from_forgery with: :exception
  helper_method :key

  def key
    "RGAPI-28a9f378-6242-43bb-b322-989c1585566f"
  end
end
