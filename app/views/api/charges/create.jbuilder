json.charge do
  json.checkout_session_id @charge.checkout_session_id
  json.checkout_url @checkout_url
end