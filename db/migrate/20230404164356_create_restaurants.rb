class CreateRestaurants < ActiveRecord::Migration[6.1]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :address
      t.string :phone_number
      t.string :zip_code
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
