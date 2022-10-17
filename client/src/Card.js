import './css/card.css';

function Card(props) {
  return (
    <div className='card-container' onClick={props.onClick}>
      <img src={`http://localhost:8000/${props.imageUrl}`} alt={props.title}/>
      <h3>{props.title}</h3>
      <p>{props.description}</p><br/>
      <p>-{props.writer}-</p>
    </div>
  )
}

export default Card;