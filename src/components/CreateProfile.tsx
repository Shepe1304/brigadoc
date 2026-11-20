import toast from "react-hot-toast";
import { supabase } from "../lib/supabase/supabase";
import { useNavigate } from "react-router";

const CreateProfile = () => {
  const submitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());
    
    const {data, error} = await supabase.from('brigaders').insert([formDataObj]);

    if (error) {
      // alert('Error creating profile:' + error.message);
      toast.error('Failed to create profile.');
    } else {
      // alert('Profile created successfully!');
      toast.success('Profile created successfully!');
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
        <input type="text" id="name" name="name" required />
        <label htmlFor="appearance">Appearance:</label>
        <input type="text" id="appearance" name="appearance" required />
        <label htmlFor="picUrl">URL of profile picture:</label>
        <input type="text" id="picUrl" name="picUrl" />
        <label htmlFor="squad">Squad:</label>
        <input type="text" id="squad" name="squad" required />
        <label htmlFor="role">Role:</label>
        <input type="text" id="role" name="role" required />
        <label htmlFor="bio">Bio:</label>
        <input type="text" id="bio" name="bio" required />
        <label htmlFor="element">Element:</label>
        <input type="text" id="element" name="element" required />
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateProfile;