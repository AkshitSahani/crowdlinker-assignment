class User < ApplicationRecord
  has_secure_password

  has_many :likes
  has_many :articles, through: :likes

  EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
  # NAME_REGEX = /^[a-z\u00C0-\u02AB´`]+$/i

  before_save { self.email = email.downcase }

  validates :first_name, :last_name, :password, :password_confirmation,
    presence: true

  validates :first_name, :last_name,
    length: {in: 2..20, }
    # format: {with: NAME_REGEX}

  validates :email,
    presence: true,
    uniqueness: { case_sensitive: false },
    format: { with: EMAIL_REGEX, message: 'Incorrect email format' }

  validates :password,
    confirmation: true,
    format: {with: PASSWORD_REGEX, message: 'Password must be alphanumeric with at least one special character and one capital letter'},
    length: {in: 8..20, message: 'Password must be between 8 and 20 characters'}

end
