import { useState, useEffect } from "react";
import Card from "./components/Card";
import "./App.css";

const EMOJIS = ["🦁", "🎈", "🎃", "🦊", "⚽", "🍕", "🐙", "🍓"];
const TOTAL_PAIRS = EMOJIS.length;

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [steps, setSteps] = useState(0);
  const [matches, setMatches] = useState(0);
  const [victory, setVictory] = useState(false);

  // Initialize or reset the game
  function resetGame() {
    const shuffledCards = [...EMOJIS, ...EMOJIS]
      .map((emoji, index) => ({
        id: `${index}-${emoji}`,
        value: emoji,
        isFlipped: false,
        isMatched: false,
        status: "" // "" | "correct" | "wrong"
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlipped([]);
    setSteps(0);
    setMatches(0);
    setVictory(false);
  }

  useEffect(() => {
    resetGame();
  }, []);

  function handleCardClick(index) {
    if (cards[index].isFlipped || cards[index].isMatched || flipped.length === 2) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    const newFlipped = [...flipped, index];

    setCards(newCards);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setSteps(prev => prev + 1);
      const [first, second] = newFlipped;

      if (newCards[first].value === newCards[second].value) {
        // Matched pair
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        newCards[first].status = "correct";
        newCards[second].status = "correct";

        setCards(newCards);
        setFlipped([]);
        setMatches(prev => {
          const newMatchCount = prev + 1;
          if (newMatchCount === TOTAL_PAIRS) setVictory(true);
          return newMatchCount;
        });
      } else {
        newCards[first].status = "wrong";
        newCards[second].status = "wrong";
        setCards(newCards);

        setTimeout(() => {
          newCards[first].isFlipped = false;
          newCards[second].isFlipped = false;
          newCards[first].status = "";
          newCards[second].status = "";
          setCards([...newCards]);
          setFlipped([]);
        }, 1000);
      }
    }
  }

  return (
    <div className="main-container">
      <h1>Memory Game React </h1>
      <h2>Lets test your memory Kfir 🦁</h2>
      <p>Moves: {steps}</p>

      {!victory ? (
        <div className="board">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              value={card.value}
              isFlipped={card.isFlipped || card.isMatched}
              status={card.status}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      ) : (
        <div className="victory-screen">
          <h2>🏆 Victory!</h2>
          <p>You Won in {steps} moves </p>
          <button className="restart-btn" onClick={resetGame}>
            Let's Play Again 🔁
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
