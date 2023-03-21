import { Outlet } from "react-router-dom";

export default function CollaborationActivities() {
  return (
    <>
      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
        <Outlet />
      </div>
    </>
  )
}
