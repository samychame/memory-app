function Card({ item, id, handleClick }) {
  let className = "card";
  if (item.stat) className += " " + item.stat;

  return (
    <div className={className} onClick={() => handleClick(id)}>
      <div className="card-inner">
        <div className="card-front">❓</div>
        <div className="card-back">{item.emoji}</div>
      </div>
    </div>
  );
}

export default Card;
