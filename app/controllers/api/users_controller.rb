require 'pry';

module Api
  class UsersController < ApplicationController
    skip_before_action :authenticate_request, only: [:create]

    def create
      @user = User.new(user_params)
      binding.pry
      if @user.save
        render json: @user, status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    def show
      @user = User.find(params[:id])
      render json: @user, status: :ok
    end

    def update
      @user = User.find(params[:id])
      if @user.update(user_params)
        render json: @user, staus: :updated
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:password, :id, :first_name, :last_name, :email)
    end
  end
end
