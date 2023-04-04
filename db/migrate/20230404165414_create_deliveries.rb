class CreateDeliveries < ActiveRecord::Migration[6.1]
  def change
    create_table :deliveries do |t|
      t.string :delivery_status
      t.datetime :delivery_time
      t.belongs_to :order, null: false, foreign_key: true

      t.timestamps
    end
  end
end
