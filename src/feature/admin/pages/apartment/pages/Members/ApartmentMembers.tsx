import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MemberTable from "../../components/MemberTable";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";

// const API = "/api/admin/apartment";
const API = import.meta.env.VITE_BACKEND_URL;

const ApartmentMembers = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchMembers = async () => {
    try {
      const offset = (page - 1) * limit;

      const { data } = await axios.get(
        `${API}/api/admin/apartment/members/pagination?limit=${limit}&offset=${offset}`,
        {
          withCredentials: true,
        },
      );

    setMembers(data.data);
    setTotal(data.total);
    } catch (err) {
      console.error(err);
    }
  };

  const searchMembers = async () => {
    try {
      if (!search.trim()) {
        fetchMembers();
        return;
      }

      const { data } = await axios.get(
        `${API}/api/admin/apartment/members/search?search=${search}`,
        {
          withCredentials: true,
        },
      );

      setMembers(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchMembers();
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Apartment Members</h1>

        <div className="flex gap-3">
          <Link
            to="/admin/organisation/apartment/members/import"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Import
          </Link>

          <Link
            to="/admin/organisation/apartment/members/add"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Add Member
          </Link>
        </div>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      <div className="mt-5">
        <MemberTable members={members} reload={fetchMembers} />
      </div>

      <div className="mt-6">
        <Pagination
          currentPage={page}
          totalItems={total}
          pageSize={limit}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default ApartmentMembers;
