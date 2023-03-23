import { Link } from "react-router-dom";

export default function ListDisciplines() {
  return (
    <>
      <h2 className="mb-5">Collaborate dashboard</h2>

      <div className="mb-5 d-flex justify-content-between "> 
        <div style={{ maxWidth: '500px'}}>
          <input
            placeholder="Discipline name"
            aria-label="Discipline name"
          />
          <button className="" >
            Search
          </button>
        </div>
        <Link className="btn btn-success mr-0 ml-auto" to={'/environment/teacher/collaboration-disciplines/create'} >Create discipline</Link>
      </div>

      <div>
        <div>
          <div>
            <table >
              <thead>
                <tr>
                  <th>Discipline Name</th>
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
                  <th>Discipline Name</th>
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