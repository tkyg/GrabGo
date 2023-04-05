class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :role
  # , :email, :phone_number, :password_digest
end
