import Navbar from './components/Navbar';
import Hero from './components/Hero';


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white w-full max-w-7xl mx-auto px-0 md:px-6 relative">
      <Navbar />
      <Hero />
      
      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-xl hover:bg-indigo-700 transition z-30">
        ✨
      </button>
    </div>
  );
}