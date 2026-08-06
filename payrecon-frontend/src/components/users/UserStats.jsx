import { Users, ShieldCheck, UserCog, UserCheck } from "lucide-react";

import { usersData } from "../../constants/usersData";

function UserStats() {
  const totalUsers = usersData.length;
  const admins = usersData.filter((u) => u.role === "ADMIN").length;
  const makers = usersData.filter((u) => u.role === "MAKER").length;
  const checkers = usersData.filter((u) => u.role === "CHECKER").length;

  const cards = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/15",
    },
    {
      title: "Admins",
      value: admins,
      icon: ShieldCheck,
      color: "text-indigo-400",
      bg: "bg-indigo-500/15",
    },
    {
      title: "Makers",
      value: makers,
      icon: UserCog,
      color: "text-green-400",
      bg: "bg-green-500/15",
    },
    {
      title: "Checkers",
      value: checkers,
      icon: UserCheck,
      color: "text-orange-400",
      bg: "bg-orange-500/15",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-[#141C28] border border-[#243041] rounded-2xl p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">{card.title}</p>

                <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
              </div>

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg}`}
              >
                <Icon className={card.color} size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserStats;
