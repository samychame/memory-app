import { useState, useEffect } from "react";
import Card from "/components/Card";
import "./App.css";

const emojis = ["🦁", "🐸", "🐱", "🦊", "🐵", "🐷", "🐙", "🐢"];
const TOTAL_PAIRS = emojis.length;

function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [steps, setSteps] = useState(0);
  const [matches, setMatches] = useState(0);
  const [victory, setVictory] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  function resetGame() {
    const shuffled = [...emojis, ...emojis]
      .map((emoji, i) => ({
        id: i + "-" + emoji,
        value: emoji,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlipped([]);
    setSteps(0);
    setMatches(0);
    setVictory(false);
  }

  function handleCardClick(index) {
    if (cards[index].isFlipped || cards[index].isMatched || flipped.length === 2) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    const newFlipped = [...flipped, index];

    setCards(newCards);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setSteps((prev) => prev + 1);

      const [i1, i2] = newFlipped;
      if (newCards[i1].value === newCards[i2].value) {
        newCards[i1].isMatched = true;
        newCards[i2].isMatched = true;
        setCards(newCards);
        setFlipped([]);
        setMatches((prev) => {
          const newMatch = prev + 1;
          if (newMatch === TOTAL_PAIRS) {
            setVictory(true);
          }
          return newMatch;
        });
      } else {
        setTimeout(() => {
          newCards[i1].isFlipped = false;
          newCards[i2].isFlipped = false;
          setCards([...newCards]);
          setFlipped([]);
        }, 1000);
      }
    }
  }

  return (
    <div className="main-container">
      <h1>🧠 משחק זיכרון</h1>
      <p>ניסיונות: {steps}</p>

      {!victory ? (
        <div className="board">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              value={card.value}
              isFlipped={card.isFlipped || card.isMatched}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      ) : (
        <div className="victory-screen">
          <h2>🏆 Victory!</h2>
          <p>סיימת את המשחק ב־{steps} צעדים</p>
          <button className="restart-btn" onClick={resetGame}>
            שחק שוב 🔁
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
