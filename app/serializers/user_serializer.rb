class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone_number, :password_digest
end
