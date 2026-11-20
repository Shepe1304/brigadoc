import { Link } from "react-router";
import { supabase } from "../lib/supabase/supabase";
import { toast } from "react-hot-toast";

const ProfileCard = ({brigader}) => {
  const defaultPicUrl = "https://compote.slate.com/images/8feec7a3-bb0f-42be-bfc7-257757840f9b.png?width=1200&rect=899x599&offset=0x28";

  const confirmDeleteProfile = async () => {
    const { error } = await supabase.from('brigaders').delete().eq('id', brigader.id);

    if (error) {
      toast.error('Failed to delete profile.');
    } else {
      toast.success('Profile deleted successfully.');
      window.location.reload(); // Refresh the page to reflect the deletion
    }
  }

  const deleteProfile = () => {
    
    toast((t) => (
      <div className="flex items-center gap-2">
        <span>Delete item?</span>
        <button onClick={() => { toast.dismiss(t.id); confirmDeleteProfile(); }}>
          Confirm
        </button>
        <button onClick={() => toast.dismiss(t.id)}>
          Cancel
        </button>
      </div>
    ), { duration: Infinity });
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", textAlign: "left" }}>
      <Link to={`/${brigader.id}/edit`}>
        <button>Edit profile</button>
      </Link>
      <br />
      <button onClick={deleteProfile}>Delete profile</button>
      <br />
      <h3>{brigader.id} - {brigader.name}</h3>
      <img src={brigader.picUrl ?? defaultPicUrl} alt="brigader's profile pic" />
      <p><b>Squad:</b> {brigader.squad} - <b>Role:</b> {brigader.role}</p>
      <p><b>Appearance:</b> {brigader.appearance}</p>
      <p><b>Description:</b> {brigader.description}</p>
      <p><b>Bio:</b> {brigader.bio}</p>
      <p><b>Element:</b> {brigader.element}</p>
    </div>
  );
};

export default ProfileCard;