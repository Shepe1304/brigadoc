import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase/supabase'
import Homepage from './components/Homepage'

export default function App() {
  // const [instruments, setInstruments] = useState([])

  // useEffect(() => {
  //   async function getInstruments() {
  //     const { data: instruments } = await supabase.from('instruments').select()

  //     if (instruments) {
  //       setInstruments(instruments)
  //     }
  //   }

  //   getInstruments()
  // }, [])

  // <ul>
  //   {instruments.map((instrument) => (
  //     <li key={instrument.id}>{instrument.name}</li>
  //   ))}
  // </ul>
  return (
    <div>
      <Homepage />
    </div>
  )
}