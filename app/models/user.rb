class User < ApplicationRecord
  has_many :reviews, dependent: :destroy
  has_many :restaurants, through: :reviews
  has_many :orders 


  has_secure_password
  validates :username, presence: true, uniqueness: true
  
end
