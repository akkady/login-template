import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const effectMout = useRef(false);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    if (effectMout.current) {
      axiosPrivate
        .get("/users", { signal: controller.signal })
        .then((res) => {
          if (isMounted) {
            setUsers(res.data);
            setRefreshing(false);
          }
        })
        .catch((err) => {
          if (Object.keys(err).length) {
            navigate("/login", { state: { from: location }, replace: true });
          }
        });
    }

    return () => {
      isMounted = false;
      controller.abort("aborted");
      effectMout.current = true;
    };
  }, []);

  return (
    <div className="p-10">
      <div className="">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Users List
        </h3>
        <ul>
          {users.length > 0 &&
            users?.map((user) => (
              <li key={user?.id} className="flex">
                <p>
                  <strong>Name</strong> : {user?.username}
                </p>
                <p className="ms-5">
                  <strong>Role</strong> :
                  {user?.appRoles?.map((role, index) => role.roleName + ", ")}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
