import { useEffect, useState } from "react";
import UserService from "../api/user.service";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";

const Dashboard = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, username: "username", roles: ["admin", "user"] },
  ]);
  const loadUsers = () => {
    axiosPrivate.get("/users").then((res) => {
      setUsers(res.data);
      setRefreshing(false);
    });
  };
  useEffect(() => {
    UserService.getUsers(auth?.token).then((res) => setUsers(res.data));
    return () => {
      setUsers([]);
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
      <div className="mt-8">
        <p>{refreshing && <span>refreshing ...</span>}</p>

        <button
          className="mt-4h-10 w-52 rounded-sm bg-slate-500 "
          onClick={() => {
            loadUsers(), setRefreshing(true);
          }}
        >
          refresh
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
