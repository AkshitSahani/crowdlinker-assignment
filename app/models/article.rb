class Article < ApplicationRecord
  has_many :likes

  validates :title,
    presence: true,
    uniqueness: {case_sensitive: false, message: 'An article already exists with this title!'},
    length: {minimum: 3, message: 'The title must be at least 3 letters long!'}

  validates :description,
    presence: true,
    length: {in: 20..2000}

end
