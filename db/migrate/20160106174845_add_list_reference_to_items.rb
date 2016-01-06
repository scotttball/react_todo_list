class AddListReferenceToItems < ActiveRecord::Migration
  def change
    add_reference :items, :list, index: true, foreign_key: true
  end
end
