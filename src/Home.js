import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    navigate("/employees");
  };
  return (
    <div className="home-con">
      <form className="container" onSubmit={handlesubmit}>
        <h2>Login</h2>
        <br />
        <div >
          <input className="hii" type="text" placeholder="User Name" required></input>
        </div>
        <div>
          <br />
        
          <input className="hii" type="password" placeholder="Password" required></input>
        </div>
        <div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
