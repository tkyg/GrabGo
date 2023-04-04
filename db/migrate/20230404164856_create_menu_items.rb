class CreateMenuItems < ActiveRecord::Migration[6.1]
  def change
    create_table :menu_items do |t|
      t.string :name
      t.text :description
      t.decimal :price
      t.string :category
      t.boolean :is_vegetarian
      t.boolean :is_gluten_free
      t.belongs_to :restaurant, null: false, foreign_key: true

      t.timestamps
    end
  end
end
