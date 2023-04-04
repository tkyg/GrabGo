class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :price, :customization
  has_one :order
  has_one :menu
end
