import './index.css'

const AboutListItems = props => {
  const {aboutListItemDetails} = props
  const {answer, question} = aboutListItemDetails

  return (
    <li className="list-item-containers">
      <p className="question">{question}</p>
      <p className="answer">{answer}</p>
    </li>
  )
}
export default AboutListItems
