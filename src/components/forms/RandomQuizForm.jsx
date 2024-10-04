import axios from "axios"
import { useState } from "react"

export default function RandomQuizForm() {
  const [question, setQuestion] = useState({})

  const loadQuestion = async () => {
    const response = await axios.get("http://localhost:3000/api/questions/random")
  }

  return (
    <>
    
    </>
  )
}