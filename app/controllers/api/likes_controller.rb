require 'pry'

module Api
  class LikesController < ApplicationController
    def create
      @like = Like.where(user_id: current_user.id).where(article_id: params[:article_id])
      # binding.pry
      if(@like.count > 0)
        @like[0].destroy
        render json: {message: 'Like successfully removed!'}, status: :ok
      else
        # binding.pry
        @like = Like.new(article_id: params[:article_id], user_id: current_user.id)
        # binding.pry
        if @like.save
          render json: {message: "Like successfully created!"}, status: :ok
        else
          render json: {message: @like.errors.full_messages}, status: :unprocessable_entity
        end

      end
    end

    private

    def like_params
      params.require(:like).permit(:user_id, :article_id)
    end

  end
end
