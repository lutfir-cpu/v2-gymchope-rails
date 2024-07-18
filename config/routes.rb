Rails.application.routes.draw do
  get '/dayslots', to: 'day_slots#index'
  get '/dayslots/:id', to: 'day_slots#show'

  resources :sessions, only: [:create, :index]
  resources :registrations, only: [:create, :index]
  resources :bookings, only: [:index, :show, :create]
  resources :slots, only: [:index, :show]

  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"

  root to: "static#home"

  get "up" => "rails/health#show", as: :rails_health_check

end
