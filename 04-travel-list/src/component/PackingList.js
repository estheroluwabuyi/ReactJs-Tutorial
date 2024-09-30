import { useState } from "react";
import Item from "./Item.js";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  //with slice, we're basically taking a copy of the array. Without slice, sort method is going to mutate the original array
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {/* {items.map((i) => (
              <Item
                item={i}
                onDeleteItem={onDeleteItem}
                onToggleItem={onToggleItem}
                key={i.id}
              /> */}

        {sortedItems.map((i) => (
          <Item
            item={i}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={i.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>

        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
