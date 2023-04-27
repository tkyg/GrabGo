class Restaurant < ApplicationRecord
  belongs_to :user
  has_many :menu_items
  has_many :orders 
  has_many :reviews, dependent: :destroy

  # validates :zip_code, format: { with: /\A\d{5}\z/, message: "should be 5 digits" }
  validates :name, presence: true
  validates :address, presence: true
  validates :zip_code, presence: true
  validates :description, presence: true
end
