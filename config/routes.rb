Rails.application.routes.draw do

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  resources :sessions, only: [:create, :index]
  resources :registrations, only: [:create, :index]
  resources :feedbacks, only: [:create, :index]

  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"

  post '/register', to: 'registrations#create'
  post '/login', to: 'sessions#create'

  get 'feedbacks/create'
  get 'feedbacks/index'

  root to: "static#home"

end
