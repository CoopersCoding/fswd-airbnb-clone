module Api
  class PropertiesController < ApplicationController
    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties

      render 'api/properties/index', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@property

      render 'api/properties/show', status: :ok
    end

    def new
      @property = Property.new
    end
  
    def create
      @property = Property.new(property_params)
      if @property.save
        redirect_to @property, notice: 'Property was successfully created.'
      else
        render :new
      end
    end
  
    private
  
    def property_params
      params.require(:property).permit(
        :title, 
        :description, 
        :city, 
        :country, 
        :property_type, 
        :price_per_night, 
        :max_guests, 
        :bedrooms, 
        :beds, 
        :baths, 
        :image_url, 
        :user_id
      )
    end
  end
end