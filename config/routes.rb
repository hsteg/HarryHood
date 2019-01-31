Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :show] 
    resources :users do
      get 'held_stocks', on: :member
      get 'cash_balance', on: :member
    end
    resources :transactions, only: [:show, :create]
    resources :user_watches, only: [:show, :destroy]
    resources :stocks, only: [:index, :show]
    post 'user_watches/:user_id/:stock_id', to: 'user_watches#create'
  end
  
  root "static_pages#root"
end
