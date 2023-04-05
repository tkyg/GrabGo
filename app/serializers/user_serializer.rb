class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :phone_number, :password_digest, :role
  
end
