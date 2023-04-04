class OrderSerializer < ActiveModel::Serializer
  attributes :id, :delivery_address, :total_price, :delivery_status
  has_one :user
  has_one :restaurant
end
