module Api
  class ChargesController < ApplicationController
    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)

      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      booking = Booking.find_by(id: params[:booking_id])

      return render json: { error: 'cannot find booking' }, status: :not_found if !booking

      property = booking.property
      days_booked = (booking.end_date - booking.start_date).to_i
      amount = days_booked * property.price_per_night

      stripe_session = Stripe::Checkout::Session.create(
        line_items: [
          {
            price_data: {
              currency: 'usd',
              unit_amount: (amount * 100).to_i,
              product_data: {
                name: "Trip for #{property.title}",
                description: "Your booking is for #{booking.start_date} to #{booking.end_date}."
              }
            },
            quantity: 1
          }
        ],
        mode: 'payment',
        managed_payments: {
          enabled: false
        },
        success_url: "#{ENV['URL']}/booking/#{booking.id}/success",
        cancel_url: "#{ENV['URL']}#{params[:cancel_url]}"
      )

      @checkout_url = stripe_session.url

      @charge = booking.charges.new(
        checkout_session_id: stripe_session.id,
        currency: 'usd',
        amount: amount
      )

      if @charge.save
        render 'api/charges/create', status: :created
      else
        render json: { error: 'charge could not be created' }, status: :bad_request
      end
    end
  end
end