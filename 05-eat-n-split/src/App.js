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
  const [selectedFriend, setSelectedFriend] = useState(null);

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

  function handleSelection(friend) {
    // setSelectedFriend(friend);
    //rem that selectedFriend is by default set to null so each time the handleSelection is clicked, selectedFriend would be set to friend obj and since the setSelectedFriend will now be set to friend, it would open up. friend overwrites null

    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />

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
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
      {/* each time btn is clicked,setSelectedFriend is switched from null to friend obj, so it gets displayed */}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  // const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  //so now if the onSelection btn is clicked, the selectedFriend.id is now same as the friend.id

  return (
    <li className={isSelected ? "selected" : ""}>
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

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
    //so if whoIsPaying is user, then the friend is owing you,but if your friend is paying then you owe your friend hence the negative number
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />

      <label>🤵 Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            // Number(e.target.value) > bill ? bill : Number(e.target.value)
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>🤼{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who's paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
