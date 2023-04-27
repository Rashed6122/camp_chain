import profilePic from "../OLI SMOL.jpeg";
import melonicon from "../melon-icon.png";

function Header() {
  return (
    <div className="Header">
      <span id="title">Campus-Chain</span>
      <span>
        <input className="search" placeholder="Search posts"></input>
      </span>
      <img
        src={profilePic}
        alt="Profile"
        className="profile-pic"
        height={50}
        width={50}
      ></img>
      <span id="profile">
        Fakemandude <br />
        <span className="balance">
          <img
            src={melonicon}
            alt="melons"
            width="15px"
            height="15px"
          >
          </img>
          855{" "}
        </span>
      </span>
    </div>
  );
}

export default Header;
