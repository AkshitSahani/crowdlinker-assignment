class User < ApplicationRecord
  has_secure_password

  has_many :likes
  has_many :articles, through: :likes

  EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/

  before_save { self.email = email.downcase }

  validates :first_name, :last_name, :password, :password_confirmation,
    presence: true

  validates :first_name, :last_name,
    length: {in: 2..20,}

  validates :email,
    presence: true,
    uniqueness: { case_sensitive: false },
    format: { with: EMAIL_REGEX, message: 'format is incorrect' }

  validates :password,
    confirmation: true,
    format: {with: PASSWORD_REGEX, message: 'must be between 8 and 20 characters long, alphanumeric with at least one special character and one capital letter'}
    
end
