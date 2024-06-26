Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/myTrips' => 'static_pages#myTrips'
  get '/createProperty' => 'static_pages#createProperty'
  get '/property/:id' => 'static_pages#property'
  get '/login' => 'static_pages#login'
  post '/property/:new' => 'static_pages#property'
  get '/booking/:id/success' => 'static_pages#success'
  
  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show, :new, :create]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/authenticated' => 'sessions#authenticated'

    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'
    
  end
end
