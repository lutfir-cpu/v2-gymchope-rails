Rails.application.routes.draw do
  get '/dayslots', to: 'day_slots#index'
  get '/dayslots/:id', to: 'day_slots#show'
  post '/dayslots/slots_in_day', to: 'day_slots#slots_in_day'

  resources :gym_sessions, only: [:index, :create, :update]
  get :ongoing_gym_session, to: "gym_sessions#get_ongoing_gym_session"

  resources :gym_cards, only: [:index]
  resources :sessions, only: [:create, :index]
  resources :registrations, only: [:create, :index]
  resources :bookings, only: [:index, :show, :create, :destroy]
  get '/get_bookings_from_user', to: 'bookings#get_bookings_from_user'

  resources :slots, only: [:index, :show]

  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"

  root to: "static#home"

  get "up" => "rails/health#show", as: :rails_health_check

end
