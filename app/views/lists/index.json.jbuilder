json.lists @lists do |list|
  json.(list, :id, :name, :percent_complete)
  json.url list_url(list)
end