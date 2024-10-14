import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [addFriendNameInput, setAddFriendNameInput] = useState("");
  const [addFriendImgInput, setAddFriendImgInput] = useState(
    "https://i.pravatar.cc/48"
  );
  const [friends, setFriends] = useState(initialFriends);

  // const handleAddFriend(friend){
  //   setFriends((friends)=> [...friends, friend])
  // }....so he basically lifted this function, and called it inside the addFriendBtn function. Rem he created the addFriendBtn function directly inside the FormAddFunction (Still the same with what you did..the method is just diff)

  const addFriendBtn = function (e) {
    e.preventDefault();

    if (!addFriendNameInput || !addFriendImgInput) return;

    const id = crypto.randomUUID();
    const newFriends = {
      id,
      name: addFriendNameInput,
      image: `${addFriendImgInput}?=${id}`,
      balance: 0,
    };
    console.log(newFriends);

    setFriends([...friends, newFriends]);

    setAddFriendNameInput("");
    setAddFriendImgInput("https://i.pravatar.cc/48");
    setShowAddFriend(false);
  };

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />

        {showAddFriend && (
          <FormAddFriend
            nameInput={addFriendNameInput}
            setNameInput={setAddFriendNameInput}
            imgInput={addFriendImgInput}
            setImgInput={setAddFriendImgInput}
            handleAddFriend={addFriendBtn}
          />
        )}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>

      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friends }) {
  // const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

// we now have each friend in its own component
function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend({
  nameInput,
  setNameInput,
  imgInput,
  setImgInput,
  handleAddFriend,
}) {
  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
      <label>🤼Friend name</label>
      <input
        type="text"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />

      <label>📷 Image URL</label>
      <input
        type="text"
        value={imgInput}
        onChange={(e) => setImgInput(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰 Bill Value</label>
      <input type="text" />

      <label>🤵 Your expense</label>
      <input type="text" />

      <label>🤼X's expense</label>
      <input type="text" disabled />

      <label>🤑 Who's paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
