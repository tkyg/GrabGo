class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :phone_number, :zip_code, :category, :description
  has_one :user
  has_many :menu_items
end
