Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :show]
    resources :transactions, only: [:show]
    resources :user_watches, only: [:show]
    resources :stocks, only: [:index]
  end
  
  root "static_pages#root"
end
