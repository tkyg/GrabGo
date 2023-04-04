class DeliverySerializer < ActiveModel::Serializer
  attributes :id, :delivery_status, :delivery_time
  has_one :order
end
