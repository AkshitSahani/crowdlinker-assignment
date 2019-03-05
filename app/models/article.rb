class Article < ApplicationRecord

  has_many :likes

  validates :title,
    presence: true,
    uniqueness: {case_sensitive: false}

  validates :description,
    presence: true,

end
