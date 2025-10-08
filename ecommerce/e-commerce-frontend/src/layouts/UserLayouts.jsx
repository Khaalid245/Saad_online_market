import Navbar from "../components/Navbar";

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-gray-900 text-white text-center py-4">
        <p>© {new Date().getFullYear()} MegaEcommerce. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserLayout;
