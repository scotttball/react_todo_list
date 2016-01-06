Rails.application.routes.draw do
  root 'boards#index'
  resources :boards
  resources :lists
  resources :items

  put 'check_item', to: 'items#check_item'
end
