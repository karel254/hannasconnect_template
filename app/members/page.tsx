import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Members</h1>
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
                  <div className="font-semibold">{user.name}, {user.age}{user.gender === 'Male' ? ', M' : user.gender === 'Female' ? ', F' : ''}</div>
                  <div className="text-gray-600 text-sm">@{user.username}</div>
                  <div>{user.occupation}</div>
                  <div>{user.location}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredUsers.length === 0 && <div className="col-span-2 text-center text-gray-500">No members found.</div>}
      </div>
    </div>
  );
}
