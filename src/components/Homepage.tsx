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
      <header>Brigadoc</header>
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