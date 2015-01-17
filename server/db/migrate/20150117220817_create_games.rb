class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :game
      t.integer :score
      t.references :player

      t.timestamps
    end
  end
end
