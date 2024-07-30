import titleImg from "../../assets/images/title.png";
import "./Title.css";

const Title = () => (
    <div className="title-container">
        <img src={titleImg} alt="Title" className="title-image" />
        {/* Other content of the component */}
    </div>
);

export default Title;
