require 'pry';

module Api
  class ArticlesController < ApplicationController

    def index
      @articles = Article.all
      @articles.each do |article|
        @like = Like.where(article_id: article.id).where(user_id: current_user.id)
        # binding.pry
        @like.count > 0 ? article[:liked] = true : article[:liked] = false;
      end
      render json: {data: @articles, message: 'All articles'}
    end

    def create
      @article = Article.new(article_params)
      if @article.save
        render json:{data: @article, message: 'Article created successfully!'}, status: :ok
      else
        # binding.pry
        render json: {message: @article.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def show
      @article = Article.find(params[:id])
      render json: {data: @article, message: 'Article details'}, status: :ok
    end

    def udpate
      @article = Article.find(params[:id])
      if @article.update(article_params)
        render json: {data: @article, message: 'Article updated successfully!'}, staus: :ok
      else
        render json: {data: @article.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def destroy
      @article = Article.find(params[:id])
      @article.destroy
      render json: {message: 'Article deleted successfully!'}
    end

    private

    def article_params
      params.require(:article).permit(:id, :title, :description)
    end

  end
end
