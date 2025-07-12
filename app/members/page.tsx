"use client";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

// Copy the mock users from browse/page.tsx
const baseUsers = [
  {
    id: 1,
    name: "Brian Otieno",
    username: "brianotieno",
    age: 34,
    gender: "Male",
    occupation: "Engineer",
    location: "Kisumu, Kenya",
    avatar: "/images/male3.jpg",
  },
  {
    id: 2,
    name: "Faith Wambui",
    username: "faithwambui",
    age: 27,
    gender: "Female",
    occupation: "Banker",
    location: "Nairobi, Kenya",
    avatar: "/images/female3.jpg",
  },
  {
    id: 3,
    name: "Janet Mwikali",
    username: "janetmwikali",
    age: 29,
    gender: "Female",
    occupation: "Teacher",
    location: "Machakos, Kenya",
    avatar: "/images/female4.jpg",
  },
  {
    id: 4,
    name: "Peter Mwangi",
    username: "petermwangi",
    age: 44,
    gender: "Male",
    occupation: "Businessman",
    location: "Nakuru, Kenya",
    avatar: "/images/male4.jpeg",
  },
  {
    id: 5,
    name: "Akinyi",
    username: "akinyi254",
    age: 28,
    gender: "Female",
    occupation: "Graphic Designer",
    location: "Nairobi, Kenya",
    avatar: "/images/female1.jpg",
  },
];

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  const filteredUsers = useMemo(() => {
    return baseUsers.filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.location.toLowerCase().includes(search.toLowerCase());
      const matchesGender = gender ? user.gender.toLowerCase() === gender.toLowerCase() : true;
      return matchesSearch && matchesGender;
    });
  }, [search, gender]);

  return (
    <div className="relative min-h-screen bg-[#181e29]">
      {/* Filter Button - always visible, triggers sidebar */}
      <button
        className="fixed top-4 left-4 z-30 bg-[#B22222] text-white px-4 py-2 rounded shadow-md"
        onClick={() => setShowSidebar(true)}
      >
        Filter
      </button>

      {/* Sidebar Drawer - only rendered when showSidebar is true */}
      {showSidebar && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowSidebar(false)}
            aria-label="Close filter sidebar"
          />
          {/* Sidebar as modal/drawer */}
          <aside className="fixed top-0 left-0 h-full w-80 max-w-full bg-[#181e29] border-r border-gray-800 z-50 p-4 shadow-lg transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#B22222]">Filter Profiles</h2>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowSidebar(false)}
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Search by name, username, or location"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1"
              />
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </aside>
        </>
      )}

      {/* Main Content - always full width */}
      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-4">Members</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUsers.map(user => (
            <Card key={user.id}>
              <CardHeader>
                <CardTitle>{user.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold">@{user.username}, {user.age}{user.gender === 'Male' ? ', M' : user.gender === 'Female' ? ', F' : ''}</div>
                    <div>{user.occupation}</div>
                    <div>{user.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredUsers.length === 0 && <div className="col-span-2 text-center text-gray-500">No members found.</div>}
        </div>
      </main>
    </div>
  );
}
