class Board < ActiveRecord::Base
  has_many :lists, dependent: :destroy
end
