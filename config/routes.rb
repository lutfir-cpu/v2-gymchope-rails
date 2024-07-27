Rails.application.routes.draw do
  resources :history, only: [:index]
  post '/get_histories_by_user', to: 'history#get_histories_by_user'

  get 'feedbacks/create'
  get 'feedbacks/index'

  get '/dayslots', to: 'day_slots#index'
  get '/dayslots/:id', to: 'day_slots#show'
  post '/dayslots/slots_in_day', to: 'day_slots#slots_in_day'

  resources :gym_sessions, only: [:index, :create, :update]
  get :ongoing_gym_session, to: "gym_sessions#get_ongoing_gym_session"

  resources :gym_cards, only: [:index]
  get :get_available_gym_cards, to: "gym_cards#get_available_gym_cards"

  resources :sessions, only: [:create, :index]
  resources :registrations, only: [:create, :index]
  resources :bookings, only: [:index, :show, :create, :destroy]
  get '/get_bookings_from_user', to: 'bookings#get_bookings_from_user'

  resources :slots, only: [:index, :show]
  resources :feedbacks, only: [:create, :index]

  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"

  root to: "static#home"

  get "up" => "rails/health#show", as: :rails_health_check

end
