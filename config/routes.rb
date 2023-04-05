Rails.application.routes.draw do
  
  resources :reviews
  resources :order_items
  resources :deliveries, only: [:index, :show, :destroy]
  resources :orders, only: [:index, :show, :create, :update, :destroy]
  resources :menu_items, only: [:index, :show, :destroy]
  resources :restaurants, only: [:index, :show, :create, :update, :destroy]
  resources :users

  post "/login", to: 'sessions#create'
  delete "/logout", to: 'sessions#destroy'


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
