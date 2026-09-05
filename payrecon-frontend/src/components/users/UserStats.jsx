import { Users, ShieldCheck, UserCog, UserCheck } from "lucide-react";
import StatCard from "../dashboard/StatCard";

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

  const getPercentage = (value) => {
    if (totalUsers === 0) return 0;

    return ((value / totalUsers) * 100).toFixed(2);
  };

  const cards = [
    {
      key: "totalUsers",
      title: "Total Users",
      value: totalUsers,
      change: "100% of all users",
      icon: Users,
      iconBg: "bg-blue-600",
      changeColor: "text-blue-400",
    },
    {
      key: "admins",
      title: "Admins",
      value: admins,
      change: `${getPercentage(admins)}% of all users`,
      icon: ShieldCheck,
      iconBg: "bg-indigo-600",
      changeColor: "text-indigo-400",
    },
    {
      key: "makers",
      title: "Makers",
      value: makers,
      change: `${getPercentage(makers)}% of all users`,
      icon: UserCog,
      iconBg: "bg-green-600",
      changeColor: "text-green-400",
    },
    {
      key: "checkers",
      title: "Checkers",
      value: checkers,
      change: `${getPercentage(checkers)}% of all users`,
      icon: UserCheck,
      iconBg: "bg-orange-500",
      changeColor: "text-orange-400",
    },
  ];

  return (
    <section className="grid grid-cols-4 gap-3 mb-3">
      {cards.map((card) => (
        <StatCard
          key={card.key}
          title={card.title}
          value={card.value}
          change={card.change}
          icon={card.icon}
          iconBg={card.iconBg}
          changeColor={card.changeColor}
        />
      ))}
    </section>
  );
}

export default UserStats;