import React, { useState } from 'react'
import styles from './styles.module.css'

function Feedback({ title, yesTxt, noTxt, thanksTxt, helpUsImproveTxt, children }) {
  // const [voteSubmitted, setVoteSubmitted] = useState(false)
  const voteSubmitted = false
  const actions = (
    <div className={styles.feedbackActions}>
      <button className={styles.actionButton} >{yesTxt}</button>
      <button className={styles.actionButton} >{noTxt}</button>
    </div>
  )

  const thanks = (
    <div className='feedback-result'>
      {thanksTxt}
    </div>
  )
  return (
    <div className={styles.feedback}>
      <h3>{title}</h3>
      {voteSubmitted ? thanks : actions}
      <h4>{helpUsImproveTxt}</h4>
      {children}
    </div>
  )
}

Feedback.defaultProps = {
  title: 'Was this information helpful?',
  yesTxt: 'Yes',
  noTxt: 'No',
  thanksTxt: 'Thanks!',
  helpUsImproveTxt: 'Help us improve this site!',
}

export default Feedback