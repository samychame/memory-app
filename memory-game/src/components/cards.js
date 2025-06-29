import { useState } from "react";
import Card from "./card";

function Cards() {
  const [items, setItems] = useState(
    [
      { id: 1, emoji: "🦁", stat: "" },
      { id: 1, emoji: "🦁", stat: "" },
      { id: 2, emoji: "🎈", stat: "" },
      { id: 2, emoji: "🎈", stat: "" },
      { id: 3, emoji: "🎃", stat: "" },
      { id: 3, emoji: "🎃", stat: "" },
      { id: 4, emoji: "🎡", stat: "" },
      { id: 4, emoji: "🎡", stat: "" },
      { id: 5, emoji: "⚽", stat: "" },
      { id: 5, emoji: "⚽", stat: "" },
      { id: 6, emoji: "🍕", stat: "" },
      { id: 6, emoji: "🍕", stat: "" },
      { id: 7, emoji: "🍓", stat: "" },
      { id: 7, emoji: "🍓", stat: "" },
      { id: 8, emoji: "🔆", stat: "" },
      { id: 8, emoji: "🔆", stat: "" },
    ].sort(() => Math.random() - 0.5)
  );

  const [prev, setPrev] = useState(-1);
  const [disabled, setDisabled] = useState(false);

  function handleClick(id) {
    if (disabled || items[id].stat !== "") return;

    const newItems = [...items];
    newItems[id] = { ...newItems[id], stat: "active" };
    setItems(newItems);

    if (prev === -1) {
      setPrev(id);
    } else {
      setDisabled(true);
      if (newItems[id].id === newItems[prev].id) {
        // Match!
        newItems[id].stat = "matched";
        newItems[prev].stat = "matched";
        setItems(newItems);
        setPrev(-1);
        setDisabled(false);
      } else {
        // Wrong match
        newItems[id].stat = "wrong";
        newItems[prev].stat = "wrong";
        setItems([...newItems]);

        setTimeout(() => {
          newItems[id].stat = "";
          newItems[prev].stat = "";
          setItems([...newItems]);
          setPrev(-1);
          setDisabled(false);
        }, 1000);
      }
    }
  }

  return (
    <div className="container">
      {items.map((item, index) => (
        <Card key={index} item={item} id={index} handleClick={handleClick} />
      ))}
    </div>
  );
}

export default Cards;
