class Review < ApplicationRecord
  belongs_to :user
  belongs_to :restaurant

  validates :comment, presence: true, length: { minimum: 5, maximum: 500 }
end
