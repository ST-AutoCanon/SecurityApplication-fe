import {
  useEffect,
  useState,
} from "react";

import axios from "axios";


const API =
  import.meta.env.VITE_BACKEND_URL;


/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

type Period =
  | "daily"
  | "weekly"
  | "monthly";


type SecurityGuard = {
  user_id: number;
  full_name: string;
  login_time: string;
};


/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
*/

type LoggedInSecurityGuardsProps = {
  period: Period;
};


/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

export default function LoggedInSecurityGuards({
  period,
}: LoggedInSecurityGuardsProps) {

  const [
    guards,
    setGuards,
  ] = useState<SecurityGuard[]>([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  /*
  |--------------------------------------------------------------------------
  | Load Guards
  |--------------------------------------------------------------------------
  */

  const loadSecurityGuards =
    async () => {

      try {

        setLoading(true);


        const response =
          await axios.get(
            `${API}/api/admin/dashboard/security-guards`,
            {
              params: {
                period,
              },

              withCredentials: true,
            }
          );


        setGuards(
          response.data?.data || []
        );

      } catch (error) {

        console.error(
          "Failed to load security guards:",
          error
        );

        setGuards([]);

      } finally {

        setLoading(false);

      }
    };


  /*
  |--------------------------------------------------------------------------
  | Reload whenever Daily / Weekly / Monthly changes
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    loadSecurityGuards();

  }, [period]);


  /*
  |--------------------------------------------------------------------------
  | Optional auto refresh
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const interval =
      setInterval(() => {

        loadSecurityGuards();

      }, 30000);


    return () => {
      clearInterval(interval);
    };

  }, [period]);


  /*
  |--------------------------------------------------------------------------
  | Format Time
  |--------------------------------------------------------------------------
  */

  const formatTime = (
    time: string
  ) => {

    if (!time) {
      return "--";
    }


    return new Date(
      time
    ).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );
  };


  /*
  |--------------------------------------------------------------------------
  | Dynamic Title
  |--------------------------------------------------------------------------
  */

  const getTitle = () => {

    switch (period) {

      case "weekly":
        return "Logged in Security Guards (This Week)";

      case "monthly":
        return "Logged in Security Guards (This Month)";

      case "daily":
      default:
        return "Logged in Security Guards (Today)";
    }
  };


  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (

    <div
      className="
        bg-white
        rounded-xl
        border
        border-slate-200
        shadow-sm
        p-4
        h-full
      "
    >

      {/* ======================================================
          HEADER
      ======================================================= */}

      <div
        className="
          flex
          items-center
          justify-between
          mb-4
        "
      >

        <h2
          className="
            text-sm
            font-semibold
            text-slate-800
          "
        >
          {getTitle()}
        </h2>


        <button
          onClick={loadSecurityGuards}
          className="
            text-xs
            text-blue-600
            hover:text-blue-700
            font-medium
          "
        >
          Refresh
        </button>

      </div>


      {/* ======================================================
          TABLE
      ======================================================= */}

      <div className="overflow-x-auto">

        <table className="w-full">

          {/* HEADER */}

          <thead>

            <tr
              className="
                bg-slate-50
                border-b
                border-slate-200
              "
            >

              <th
                className="
                  text-left
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-slate-600
                "
              >
                #
              </th>


              <th
                className="
                  text-left
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-slate-600
                "
              >
                Guard Name
              </th>


              <th
                className="
                  text-left
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-slate-600
                "
              >
                Login Time
              </th>


              <th
                className="
                  text-left
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-slate-600
                "
              >
                Status
              </th>

            </tr>

          </thead>


          {/* BODY */}

          <tbody>

            {/* LOADING */}

            {loading ? (

              <tr>

                <td
                  colSpan={4}
                  className="
                    text-center
                    py-8
                    text-sm
                    text-slate-500
                  "
                >
                  Loading guards...
                </td>

              </tr>

            ) : guards.length === 0 ? (

              /* EMPTY */

              <tr>

                <td
                  colSpan={4}
                  className="
                    text-center
                    py-8
                    text-sm
                    text-slate-500
                  "
                >
                  No security guards logged in
                </td>

              </tr>

            ) : (

              /* DATA */

              guards.map(
                (
                  guard,
                  index
                ) => (

                  <tr
                    key={
                      guard.user_id
                    }
                    className="
                      border-b
                      border-slate-100
                      hover:bg-slate-50
                      transition
                    "
                  >

                    {/* NUMBER */}

                    <td
                      className="
                        px-3
                        py-3
                        text-xs
                        text-slate-600
                      "
                    >
                      {index + 1}
                    </td>


                    {/* GUARD NAME */}

                    <td
                      className="
                        px-3
                        py-3
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <div
                          className="
                            w-7
                            h-7
                            rounded-full
                            bg-blue-100
                            text-blue-700
                            flex
                            items-center
                            justify-center
                            text-xs
                            font-semibold
                            uppercase
                          "
                        >
                          {guard.full_name
                            ?.charAt(0)}
                        </div>


                        <span
                          className="
                            text-xs
                            font-medium
                            text-slate-800
                          "
                        >
                          {guard.full_name}
                        </span>

                      </div>

                    </td>


                    {/* LOGIN TIME */}

                    <td
                      className="
                        px-3
                        py-3
                        text-xs
                        text-slate-600
                      "
                    >
                      {formatTime(
                        guard.login_time
                      )}
                    </td>


                    {/* STATUS */}

                    <td
                      className="
                        px-3
                        py-3
                      "
                    >

                      <span
                        className="
                          inline-flex
                          items-center
                          px-2
                          py-1
                          rounded-md
                          bg-green-100
                          text-green-700
                          text-[11px]
                          font-semibold
                        "
                      >
                        On Duty
                      </span>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>


      {/* ======================================================
          FOOTER
      ======================================================= */}

      {!loading && (

        <div
          className="
            mt-3
            text-xs
            text-slate-500
          "
        >
          Showing{" "}
          {guards.length}{" "}
          {guards.length === 1
            ? "guard"
            : "guards"}
        </div>

      )}

    </div>

  );
}