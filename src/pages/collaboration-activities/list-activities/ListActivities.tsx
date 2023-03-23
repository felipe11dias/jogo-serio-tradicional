import { Link } from "react-router-dom";
import './style.css';

export default function ListActivities() {
  return (
    <>
      <h2 className="mb-5">Collaborate dashboard</h2>

      <div className="mb-5 d-flex justify-content-between "> 
        <div style={{ maxWidth: '500px'}}>
          <input
            placeholder="Activity name"
            aria-label="Activity name"
          />
          <button className="" >
            Search
          </button>
        </div>
        <Link className="btn btn-success mr-0 ml-auto" to={'/environment/teacher/collaboration-activities/create'} >Create activity</Link>
      </div>

      <div>
        <div>
          <div>
            <table >
              <thead>
                <tr>
                  <th>Activity Name</th>
                  <th>Theme Name</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Programming Logic</td>
                  <td>Information Technology</td>
                  <td>Felipe Dias</td>
                </tr>
                <tr>
                  <td>Programming Logic</td>
                  <td>Information Technology</td>
                  <td>Felipe Dias</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>

        <div>
          <div>
            <div>
              <thead>
                <tr>
                  <th>Activity Name</th>
                  <th>Theme Name</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Programming Logic</td>
                  <td>Information Technology</td>
                  <td>Felipe Dias</td>
                </tr>
                <tr>
                  <td>Programming Logic</td>
                  <td>Information Technology</td>
                  <td>Felipe Dias</td>
                </tr>
              </tbody>
            </div>

            
          </div>
        </div>
      </div>
    </>
  )
}