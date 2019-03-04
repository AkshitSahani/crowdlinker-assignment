module Api
  class LikesController < ApplicationController
    def create
      @like = Like.new(like_params)
      if @like.save
        render json: @like, status: :created
      else
        render json: @like.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @like = Like.find(params[:id])
      @like.destoy
    end
  end

  private

  def like_params
    params.require(:like).permit(:id, :user_id, :article_id)
  end
end
