class MenuItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :category, :is_vegetarian, :is_gluten_free
  has_one :restaurant
end
