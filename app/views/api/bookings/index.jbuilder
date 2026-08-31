json.bookings do
  json.array! @bookings do |booking|
    json.id booking.id
    json.start_date booking.start_date
    json.end_date booking.end_date

    json.property do
      json.id booking.property.id
      json.title booking.property.title
      json.city booking.property.city
      json.image_url booking.property.image_url
      json.price_per_night booking.property.price_per_night
    end
  end
end