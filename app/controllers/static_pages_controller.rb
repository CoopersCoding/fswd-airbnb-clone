class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    render 'login'
  end

  def my_trips
    render 'myTrips'
  end

  def create_property
    render 'createProperty'
  end

  def success
    render 'success'
  end
end