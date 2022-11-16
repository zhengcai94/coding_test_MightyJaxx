import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            Sneaker <span>Shopping </span>App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            consectetur mollitia ut quae! Eligendi repudiandae perferendis
            itaque similique temporibus dignissimos dolorem velit ab cum
            praesentium. Eius ipsum velit dolore eum?
          </p>
          <Link to='/register' className="btn btn-hero">Login/Register</Link>
        </div>
        {/* image */}
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};
export default Landing;
