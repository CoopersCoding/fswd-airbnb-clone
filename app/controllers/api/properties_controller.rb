module Api
  class PropertiesController < ApplicationController
    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)

      render 'api/properties/index', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])

      return render json: { error: 'not_found' }, status: :not_found unless @property

      render 'api/properties/show', status: :ok
    end

    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)

      return render json: {
        error: 'You must be logged in to create a property.'
      }, status: :unauthorized unless session

      @property = session.user.properties.build(property_params)

      if @property.save
        render json: {
          property: {
            id: @property.id,
            title: @property.title
          }
        }, status: :created
      else
        render json: {
          errors: @property.errors.full_messages
        }, status: :unprocessable_entity
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
        :image_url
      )
    end
  end
end