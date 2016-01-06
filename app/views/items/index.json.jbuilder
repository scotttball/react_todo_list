json.items @items do |item|
  json.(item, :id, :name, :complete)
  json.url item_url(item)
end
