import './css/card.css';

function Card(props) {
  return (
    <div className='card-container'>
    <h3>{props.title}</h3>
    <p>{props.description}</p><br/>
    <p>-{props.writer}-</p>
    </div>
  )
}

export default Card;