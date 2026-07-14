function ProfileMenu() {
  return (
    <div className="flex items-center gap-3">
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

        <p className="text-sm text-gray-400">Admin</p>
      </div>
    </div>
  );
}

export default ProfileMenu;
