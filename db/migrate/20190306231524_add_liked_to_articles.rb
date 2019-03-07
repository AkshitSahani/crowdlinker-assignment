class AddLikedToArticles < ActiveRecord::Migration[5.1]
  def change
    add_column :articles, :liked, :boolean
  end
end
