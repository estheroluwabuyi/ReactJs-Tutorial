export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list🚀</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything ready to go ✈"
          : `👜 You have ${numItems} items on your list and you already packed
        ${numPacked} (${percentage}%)`}
        {/* so technically whenever an item gets added to the items array, the app component rerenders and this causes the items length to update each time new item gets added  to the packingList*/}
      </em>
    </footer>
  );
}
