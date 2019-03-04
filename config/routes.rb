Rails.application.routes.draw do
  # get 'users/create'
  #
  # get 'users/show'
  #
  # get 'users/update'
  #
  # get 'likes/create'
  #
  # get 'likes/destroy'
  #
  # get 'articles/create'
  #
  # get 'articles/udpate'
  #
  # get 'articles/destroy'
  #
  # get 'articles/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :users, only: [:create, :show, :update]
    resources :articles, only: [:index, :create, :update, :destroy]
    resources :likes, only: [:create, :destroy]
    post 'login', to: 'authentication#login'
  end
end
