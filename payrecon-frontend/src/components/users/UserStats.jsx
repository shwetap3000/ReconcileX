import { Users, ShieldCheck, UserCog, UserCheck } from "lucide-react";

function UserStats({ users = [] }) {
  const totalUsers = users.length;

  const admins = users.filter(
    (user) => user.role?.toUpperCase() === "ADMIN",
  ).length;

  const makers = users.filter(
    (user) => user.role?.toUpperCase() === "MAKER",
  ).length;

  const checkers = users.filter(
    (user) => user.role?.toUpperCase() === "CHECKER",
  ).length;

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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
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

                <h2 className="text-3xl font-bold mt-2 text-white">
                  {card.value}
                </h2>
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
