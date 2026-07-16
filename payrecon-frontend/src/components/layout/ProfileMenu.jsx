function ProfileMenu() {
  return (
    <div className="flex items-center gap-2">
      <div
        className="
          w-8
          h-8
          rounded-full
          bg-blue-600
          flex
          items-center
          justify-center
          font-semibold
        "
      >
        S
      </div>

      <div>
        <h4 className="text-white font-semibold">Shweta</h4>
        <p className="text-xs text-gray-400">Admin</p>
      </div>
    </div>
  );
}

export default ProfileMenu;
