# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'
puts "Seeding restaurants..."

Restaurant.destroy_all
MenuItem.destroy_all
User.destroy_all

50.times do
  user = User.new(
    username: Faker::Internet.username,
    email: Faker::Internet.email,
    password: 'password',
    role: 'restaurant_owner'
  )

  if user.save
    restaurant = Restaurant.new(
      name: Faker::Restaurant.name,
      address: Faker::Address.street_address + ', ' + Faker::Address.street_name,
      zip_code: Faker::Number.number(digits: 5),
      phone_number: Faker::PhoneNumber.phone_number,
      category: Faker::Restaurant.type,
      description: Faker::Restaurant.description,
      user: user
    )

    if restaurant.save
      rand(1..10).times do 
        restaurant.menu_items.create(
          name: Faker::Food.dish,
          description: Faker::Food.description,
          price: Faker::Number.between(from: 500, to: 1900) / 100.0,
          category: Faker::Food.ethnic_category,
          is_vegetarian: Faker::Boolean.boolean,
          is_gluten_free: Faker::Boolean.boolean,
        )
      end
    else
      puts "Unable to save restaurant #{restaurant.name}"
    end

  else
    puts "Unable to save user #{user.username}"
  end
end

puts "Done Seeding!"