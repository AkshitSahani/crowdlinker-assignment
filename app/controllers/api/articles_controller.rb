module Api
  class ArticlesController < ApplicationController

    def index
      @articles = Article.all
      render json: @articles
    end

    def create
      @article = Article.new(article_params)
      if @article.save
        render json: @article, status: :created
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
        render json: @article, staus: :updated
      else
        render json: @article.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @article = Article.find(params[:id])
      @article.destroy
    end

  end

  private

  def article_params
    params.require(:article).permit(:id, :title, :description)
  end
end
