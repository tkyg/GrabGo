class ChangePricePrecision < ActiveRecord::Migration[6.1]
  def change
    change_column :menu_items, :price, :decimal, precision: 4, scale: 2
  end
end
