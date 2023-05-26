import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
  const { empid } = useParams();

  //const [empdata, empdatachange] = useState({});

  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [sex, sexchange] = useState("");
  const [dob, dobchange] = useState("");
  const [salary, salarychange] = useState("");
  const [department, departmentchange] = useState("");
  const [active, activechange] = useState(true);
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8003/employee/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        idchange(resp.id);
        namechange(resp.name);
        sexchange(resp.sex);
        dobchange(resp.dob);
        salarychange(resp.salary);
        departmentchange(resp.department);
        activechange(resp.isactive);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const isRadio = (val) => {
    if (val == sex) {
      return true;
    }
    return false;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const empdata = { id, name, sex, dob, salary, department, active };

    fetch("http://localhost:8003/employee/" + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/employees");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Employee Edit</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        value={id}
                        disabled="disabled"
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        required
                        value={name}
                        onChange={(e) => namechange(e.target.value)}
                        className="form-control"
                      ></input>
                      {/* {name.length == 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )} */}
                    </div>
                  </div>
                  {/* <div className="col-lg-12">
                    <div className="form-group">
                      <label>Sex</label>
                      <input
                        required
                        value={sex}
                        onChange={(e) => sexchange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div> */}
                  <div className="form-group radio-div">
                    <label>Sex: </label>
                    <input
                      required
                      value="M"
                      type="radio"
                      onChange={(e) => sexchange(e.target.value)}
                      name="gender"
                      className="radio-btn"
                      checked={isRadio("M")}
                    />
                    Male
                    <input
                      required
                      value="F"
                      type="radio"
                      onChange={(e) => sexchange(e.target.value)}
                      name="gender"
                      className="radio-btn"
                      checked={isRadio("F")}
                    />
                    Female
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>DOB</label>
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => dobchange(e.target.value)}
                        className="form-control"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Salary</label>
                      <input
                        required
                        type="number"
                        value={salary}
                        onChange={(e) => salarychange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label for="department">Department</label>
                      <select
                        name="department"
                        onChange={(e) => departmentchange(e.target.value)}
                        className="form-select"
                        value={department}
                      >
                        <option value="Sales">Sales</option>
                        <option value="Hr">Hr</option>
                        <option value="Accounts">Accounts</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/employees" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpEdit;
