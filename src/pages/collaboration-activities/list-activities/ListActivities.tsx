import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { listActivities } from "../../../service/rest/apis/activityRestApi";
import { Activity } from "../../../types/Activity";
import './style.css';

export default function ListActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    listActivities().then( data => {
      console.log(data)
      setActivities(data)
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
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Discipline</th>
              <th>Teacher</th>
              <th>Questions</th>
            </tr>
          </thead>
          <tbody>
            {
              activities.length > 0 ? activities.map(activity => (
                <tr key={activity.id}>
                  <td>{activity.name}</td>
                  <td>{activity.discipline}</td>
                  <td>{activity.user}</td>
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