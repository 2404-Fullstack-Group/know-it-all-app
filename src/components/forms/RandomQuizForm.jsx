import axios from "axios"
import { useState } from "react"

export default function RandomQuizForm() {
  const [question, setQuestion] = useState({})

  const loadQuestion = async () => {
    const response = await axios.get("https://know-it-all-app.onrender.com/api/questions/random")
  }

  return (
    <>
    
    </>
  )
}