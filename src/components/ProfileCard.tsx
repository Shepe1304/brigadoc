const ProfileCard = ({brigader}) => {
  const defaultPicUrl = "https://compote.slate.com/images/8feec7a3-bb0f-42be-bfc7-257757840f9b.png?width=1200&rect=899x599&offset=0x28";

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", textAlign: "left" }}>
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