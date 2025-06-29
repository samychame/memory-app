function Card({ value, isFlipped, status = "", onClick }) {
  /*
   status: "" | "correct" | "wrong"
   isFlipped: boolean
  */

  return (
    <div className={`card ${status} ${isFlipped ? "active" : ""}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front" />
        <div className="card-back">{value}</div>
      </div>
    </div>
  );
}

export default Card;
