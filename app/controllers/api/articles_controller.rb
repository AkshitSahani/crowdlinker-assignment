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
      render json: @articles
    end

    def create
      @article = Article.new(article_params)
      if @article.save
        render json: @article, status: :ok
      else
        render json: @article.errors, status: :unprocessable_entity
      end
    end

    def show
      @article = Article.find(params[:id])
      render json: @article, status: :ok
    end

    def udpate
      @article = Article.find(params[:id])
      if @article.update(article_params)
        render json: @article, staus: :ok
      else
        render json: @article.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @article = Article.find(params[:id])
      @article.destroy
    end

    private

    def article_params
      params.require(:article).permit(:id, :title, :description)
    end
    
  end
end
