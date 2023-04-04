class Delivery < ApplicationRecord
  belongs_to :order

  validates :delivery_time, presence: true
end
