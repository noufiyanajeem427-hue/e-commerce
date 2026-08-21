const categories = [
  { id: 1, name: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Mobile Access...', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Fashion', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=300&q=80' },
];

export default function Categories() {
  return (
    <section className="py-6 px-4">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Shop by Category</h2>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="flex flex-col items-center cursor-pointer">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-2 bg-slate-100 shadow-sm border border-gray-100">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-semibold text-slate-700 text-center">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}