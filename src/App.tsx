import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase/supabase'

export default function App() {
  const [instruments, setInstruments] = useState([])

  useEffect(() => {
    async function getInstruments() {
      const { data: instruments } = await supabase.from('instruments').select()

      if (instruments) {
        setInstruments(instruments)
      }
    }

    getInstruments()
  }, [])

  return (
    <ul>
      {instruments.map((instrument) => (
        <li key={instrument.id}>{instrument.name}</li>
      ))}
    </ul>
  )
}