import "./Card.css";

function Card({ value, isFlipped, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-inner">
        <span className="emoji">{isFlipped ? value : "❓"}</span>
      </div>
    </div>
  );
}

export default Card;
