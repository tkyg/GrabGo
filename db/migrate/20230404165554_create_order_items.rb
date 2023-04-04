class CreateOrderItems < ActiveRecord::Migration[6.1]
  def change
    create_table :order_items do |t|
      t.integer :quantity
      t.decimal :price
      t.text :customization
      t.belongs_to :order, null: false, foreign_key: true
      t.belongs_to :menu, null: false, foreign_key: true

      t.timestamps
    end
  end
end
