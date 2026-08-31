module Api
  class BookingsController < ApplicationController
    def index
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)

      return render json: {
        error: 'user not logged in'
      }, status: :unauthorized unless session

      @bookings = session.user.bookings
        .includes(:property)
        .order(start_date: :desc)

      render 'api/bookings/index', status: :ok
    end

    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)

      return render json: {
        error: 'user not logged in'
      }, status: :unauthorized unless session

      property = Property.find_by(
        id: params[:booking][:property_id]
      )

      return render json: {
        error: 'cannot find property'
      }, status: :not_found unless property

      begin
        @booking = Booking.create(
          user_id: session.user.id,
          property_id: property.id,
          start_date: params[:booking][:start_date],
          end_date: params[:booking][:end_date]
        )

        render 'api/bookings/create', status: :created
      rescue ArgumentError => e
        render json: {
          error: e.message
        }, status: :bad_request
      end
    end

    def get_property_bookings
      property = Property.find_by(id: params[:id])

      return render json: {
        error: 'cannot find property'
      }, status: :not_found unless property

      @bookings = property.bookings.where(
        'end_date > ?',
        Date.today
      )

      render 'api/bookings/index'
    end
  end
end