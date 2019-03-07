require 'pry';

module Api
  class UsersController < ApplicationController
    skip_before_action :authenticate_request, only: [:create]
    wrap_parameters :user, include: [:first_name, :last_name, :email, :password, :password_confirmation]

    def create
      @user = User.new(user_params)
      if @user.save
        @user_filtered = {data: {}, message: 'User signed up successfully!'};
        @user_filtered[:data][:first_name] = @user.first_name;
        @user_filtered[:data][:last_name] = @user.last_name;
        @user_filtered[:data][:email] = @user.email;
        # binding.pry
        render json: @user_filtered, status: :ok
      else
        # binding.pry
        render json: {message: @user.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def show
      @user = User.find(params[:id])
      render json: {data: @user, message: 'User information'}, status: :ok
    end

    def update
      @user = User.find(params[:id])
      if @user.update(user_params)
        render json: {data: @user, message: 'User updated successfully!'}, status: :ok
      else
        render json: {message: @user.errors.full_messages}, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
  end
end
