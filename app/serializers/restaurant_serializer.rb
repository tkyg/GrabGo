class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :phone_number, :zip_code
  has_one :user
end
