import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase/supabase";
import ProfileCard from "./ProfileCard";

export default function Homepage() {
  const [brigaders, setBrigaders] = useState([]);

  useEffect(() => {
    async function getBrigaders() {
      const {data: brigaders} = await supabase.from('brigaders').select()

      if (brigaders) {
        setBrigaders(brigaders)
      }
    }

    getBrigaders();
  }, [])

  return (
    <div>
      <header><h1>Brigadoc</h1></header>
      <nav>
        <a href="/new">Create a new profile</a>
      </nav>
      <sub>
        Welcome to Brigadoc! Ellora is honored to have you join us.
        For the survival of Ellora!
      </sub>

      <div>
        {brigaders.map((brigader) => (
          // pic URL not implemented yet. Let's do that in the card component instead!
          <ProfileCard key={brigader.id} brigader={brigader} />
        ))}
      </div>
    </div>
  )
}