import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Pencil, Trash2, Search, Filter, X } from "lucide-react";
import {
  getUsers,
  deleteUser,
  updateUserRole,
  updateUser,
} from "../../services/admin";

interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
}

const getRoleBadge = (role: string) => {
  const isAdmin = role === "ADMIN";
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-semibold"
      style={{
        background: isAdmin ? "#fff0f6" : "#f3f4f6",
        color: isAdmin ? "var(--color-primary)" : "#6b7280",
        border: isAdmin ? "1px solid #ffc8dd" : "1px solid #e5e7eb",
      }}
    >
      {role}
    </span>
  );
};

const ManageAccounts = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    role: "",
  });
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      const list = data?.data || data || [];
      setUsers(list);
      setFiltered(list);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let result = [...users];
    if (search) {
      result = result.filter(
        (u) =>
          `${u.firstName} ${u.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          u.email?.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (roleFilter !== "All Roles") {
      result = result.filter(
        (u) => u.role?.toLowerCase().trim() === roleFilter.toLowerCase().trim(),
      );
    }
    setFiltered(result);
  }, [search, roleFilter, users]);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setDeleteConfirm(null);
      fetchUsers();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEditSave = async () => {
    if (!editUser) return;
    try {
      await updateUser(editUser.userId, {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        phone: editForm.phone,
      });
      if (editForm.role && editForm.role !== editUser.role) {
        await updateUserRole(editUser.userId, editForm.role);
      }
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p style={{ color: "var(--color-primary)" }}>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-(--space-md)">
      <div>
        <h1 className="font-bold text-2xl text-gray-800">Manage Accounts</h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
          View and manage user accounts
        </p>
      </div>

      <div
        className="bg-white rounded-2xl p-(--space-md) flex flex-wrap gap-(--space-md) items-center"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <div className="relative flex-1 min-w-48">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--color-muted)" }}
          />
          <input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none"
            style={{
              background: "var(--color-background)",
              border: "1px solid #ffc8dd",
              fontSize: 13,
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={14} style={{ color: "var(--color-muted)" }} />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-sm outline-none"
            style={{
              background: "var(--color-background)",
              border: "1px solid #ffc8dd",
              color: "var(--color-muted)",
              fontSize: 13,
            }}
          >
            <option>All Roles</option>
            <option>ADMIN</option>
            <option>MOTHER</option>
          </select>
        </div>
      </div>

      <div
        className="bg-white rounded-2xl overflow-hidden overflow-x-auto"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <table className="w-full min-w-150">
          <thead>
            <tr style={{ borderBottom: "1px solid #ffe5ef" }}>
              {[
                "User ID",
                "Name",
                "Email",
                "Role",
                "Registration Date",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-(--space-md) py-3 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--color-muted)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, i) => (
              <motion.tr
                key={user.userId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="hover:bg-pink-50 transition"
                style={{ borderBottom: "1px solid #fff0f6" }}
              >
                <td className="px-(--space-md) py-3 text-sm text-gray-500">
                  USR-{String(user.userId).padStart(3, "0")}
                </td>
                <td className="px-(--space-md) py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center rounded-full text-white text-xs font-bold shrink-0"
                      style={{
                        width: 32,
                        height: 32,
                        background: "var(--color-primary)",
                      }}
                    >
                      {user.firstName?.[0]?.toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                </td>
                <td className="px-(--space-md) py-3 text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-(--space-md) py-3">
                  {getRoleBadge(user.role)}
                </td>
                <td className="px-(--space-md) py-3 text-sm text-gray-500">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US")
                    : "—"}
                </td>
                <td className="px-(--space-md) py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition"
                      title="View"
                    >
                      <Eye size={15} className="text-gray-400" />
                    </button>
                    <button
                      onClick={() => {
                        setEditUser(user);
                        setEditForm({
                          firstName: user.firstName,
                          lastName: user.lastName,
                          phone: user.phone || "",
                          role: user.role || "",
                        });
                      }}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition"
                      title="Edit"
                    >
                      <Pencil size={15} className="text-gray-400" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(user.userId)}
                      className="p-1.5 rounded-lg hover:bg-red-50 transition"
                      title="Delete"
                    >
                      <Trash2 size={15} className="text-red-400" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div
            className="text-center py-12"
            style={{ color: "var(--color-muted)" }}
          >
            No users found.
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedUser && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 px-(--space-md)"
            style={{ background: "#00000050" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-(--space-lg) w-full max-w-md"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              <div className="flex items-center justify-between mb-(--space-md)">
                <h3 className="font-bold text-lg">User Details</h3>
                <button onClick={() => setSelectedUser(null)}>
                  <X size={18} style={{ color: "var(--color-muted)" }} />
                </button>
              </div>
              <div className="flex flex-col gap-(--space-sm)">
                {[
                  [
                    "Name",
                    `${selectedUser.firstName} ${selectedUser.lastName}`,
                  ],
                  ["Email", selectedUser.email],
                  ["Phone", selectedUser.phone || "—"],
                  ["Role", selectedUser.role],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between py-2 border-b"
                    style={{ borderColor: "#fff0f6" }}
                  >
                    <span className="text-sm font-semibold text-gray-500">
                      {label}
                    </span>
                    <span className="text-sm text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editUser && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 px-(--space-md)"
            style={{ background: "#00000050" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-(--space-lg) w-full max-w-md"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              <div className="flex items-center justify-between mb-(--space-md)">
                <h3 className="font-bold text-lg">Edit User</h3>
                <button onClick={() => setEditUser(null)}>
                  <X size={18} style={{ color: "var(--color-muted)" }} />
                </button>
              </div>
              <div className="flex flex-col gap-(--space-sm)">
                {[
                  { label: "First Name", key: "firstName" },
                  { label: "Last Name", key: "lastName" },
                  { label: "Phone", key: "phone" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">
                      {label}
                    </label>
                    <input
                      value={editForm[key as keyof typeof editForm]}
                      onChange={(e) =>
                        setEditForm({ ...editForm, [key]: e.target.value })
                      }
                      className="input"
                    />
                  </div>
                ))}

                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">
                    Role
                  </label>
                  <select
                    value={editForm.role}
                    onChange={(e) =>
                      setEditForm({ ...editForm, role: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl text-sm outline-none"
                    style={{
                      background: "var(--color-background)",
                      border: "1px solid #ffc8dd",
                      fontSize: 13,
                    }}
                  >
                    <option value="MOTHER">MOTHER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>

                <button
                  onClick={handleEditSave}
                  className="w-full py-(--space-sm) rounded-full text-white font-bold mt-(--space-sm) hover:opacity-90 transition"
                  style={{ background: "var(--color-primary)" }}
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirm !== null && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 px-(--space-md)"
            style={{ background: "#00000050" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-(--space-lg) w-full max-w-sm text-center"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              <div
                className="flex items-center justify-center rounded-full mx-auto mb-(--space-md)"
                style={{ width: 56, height: 56, background: "#fff3f3" }}
              >
                <Trash2 size={24} className="text-red-400" />
              </div>
              <h3 className="font-bold text-lg mb-(--space-xs)">
                Delete User?
              </h3>
              <p
                className="text-sm mb-(--space-md)"
                style={{ color: "var(--color-muted)" }}
              >
                This action cannot be undone.
              </p>
              <div className="flex gap-(--space-sm)">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-(--space-sm) rounded-full font-bold text-sm border-2 hover:bg-gray-50 transition"
                  style={{ borderColor: "#e5e7eb", color: "#6b7280" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 py-(--space-sm) rounded-full font-bold text-sm text-white hover:opacity-90 transition"
                  style={{ background: "#f44336" }}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageAccounts;
