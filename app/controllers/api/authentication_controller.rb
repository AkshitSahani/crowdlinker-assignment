module Api
  class AuthenticationController < ApplicationController
   skip_before_action :authenticate_request

   def login
     command = AuthenticateUser.call(params[:email], params[:password])

     if command.success?
       render json: {data: {email: params[:email], first_name: User.find_by_email(params[:email]).first_name, auth_token: command.result}, message: 'Login Successful' }
     else
       message = command.errors[:user_authentication][0]
       render json: {message: message }, status: :unauthorized
     end
   end
  end
end
