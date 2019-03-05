class User < ApplicationRecord
  has_secure_password

  has_many :likes
  has_many :articles, through: :likes

  EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  PASSWORD_REGEX = /\A(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}\z/
  # NAME_REGEX = /^[a-z\u00C0-\u02AB´`]+$/i

  before_save { self.email = email.downcase }

  validates :first_name, :last_name, :password,
    presence: true

  validates :first_name, :last_name,
    length: {in: 3..20}
    # format: {with: NAME_REGEX}

  validates :email,
    presence: true,
    uniqueness: { case_sensitive: false },
    format: { with: EMAIL_REGEX, message: 'Incorrect email format' }

  # validates :password,
  #   confirmation: true

  validates :password,
    # format: {with: PASSWORD_REGEX, message: 'Password must be alphanumeric with at least one special character and 8 letters long'},
    length: {in: 8..20}

end
