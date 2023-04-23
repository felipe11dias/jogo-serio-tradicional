import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { listDisciplines } from "../../../service/rest/apis/disciplineRestApi";
import { Discipline } from "../../../types/Discipline";

export default function ListDisciplines() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  
  useEffect(() => {
    listDisciplines().then( data => {
      console.log(data)
      setDisciplines(data)
    }).catch( error => {
      toast.error('Error: ' + error?.message)
      return null
    })
  }, [])

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
        <table align="center">
          <thead>
            <tr>
              <th>Discipline Name</th>
              <th>Theme Name</th>
              <th>Teacher</th>
              <th>Activities</th>
            </tr>
          </thead>
          <tbody>
            {
              disciplines.length > 0 ? disciplines.map(discipline => (
                <tr key={discipline.id}>
                  <td>{discipline.name}</td>
                  <td>{discipline.theme}</td>
                  <td>{discipline.user}</td>
                  <td><button type='button'>CHECK</button></td>
                </tr>
              ))
              :
              <p> List empty </p>
            }
          </tbody>
        </table>
      </div>
    </>
  )
}