class Restaurant < ApplicationRecord

  belongs_to :user
  has_many :menu_items
  has_many :orders 
  has_many :reviews, dependent: :destroy

end
