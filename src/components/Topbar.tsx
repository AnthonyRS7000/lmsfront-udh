export default function Topbar() {
  return (
    <header className="w-full bg-white shadow flex justify-between items-center px-6 py-3">
      <h1 className="text-lg font-semibold">Sistema LMS</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Hola, Admin 👋</span>
        <img
          src="https://ui-avatars.com/api/?name=Admin"
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
}
