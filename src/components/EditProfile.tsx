import toast from "react-hot-toast";
import { supabase } from "../lib/supabase/supabase";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

const EditProfile = () => {
  const [brigader, setBrigader] = useState(null);
  const { id } = useParams();


  useEffect(() => {
    const fetchBrigader = async () => {

      const { data, error } = await supabase.from('brigaders').select("*").eq('id', id).single();
      
      if (error) {
        toast.error('Failed to fetch profile.');
      } else {
        setBrigader(data);
        toast.success('Profile fetched successfully!');
      }
    };

    fetchBrigader();
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());

    const {data, error} 
    = await supabase.from('brigaders').update(formDataObj).eq('id', id);

    if (error) {
      toast.error('Failed to update profile.');
    } else {
      toast.success('Profile updated successfully!');
    }
  }

  const navigate = useNavigate();
  const onBackButtonClick = () => {
    navigate('/');
  };

  return (
    <div>
      <button onClick={onBackButtonClick}>Back to Homepage</button>
      <form action="submit" method="post" onSubmit={submitForm}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required defaultValue={brigader?.name} />
        <label htmlFor="appearance">Appearance:</label>
        <input type="text" id="appearance" name="appearance" required defaultValue={brigader?.appearance} />
        <label htmlFor="picUrl">URL of profile picture:</label>
        <input type="text" id="picUrl" name="picUrl" defaultValue={brigader?.picUrl} />
        <label htmlFor="squad">Squad:</label>
        <input type="text" id="squad" name="squad" required defaultValue={brigader?.squad} />
        <label htmlFor="role">Role:</label>
        <input type="text" id="role" name="role" required defaultValue={brigader?.role} />
        <label htmlFor="bio">Bio:</label>
        <input type="text" id="bio" name="bio" required defaultValue={brigader?.bio} />
        <label htmlFor="element">Element:</label>
        <input type="text" id="element" name="element" required defaultValue={brigader?.element} />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;