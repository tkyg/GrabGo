class Review < ApplicationRecord
  belongs_to :user
  belongs_to :restaurant
  has_many :order_items 
  has_many :menu_items, through: :order_items
  # has_one :delivery

  # validates :delivery_status, presence: true
  # validates :delivery_address, presence: true
end