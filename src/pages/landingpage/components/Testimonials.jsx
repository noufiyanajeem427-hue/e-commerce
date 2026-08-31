import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Absolutely love the fast shipping! I ordered a new smartphone and it arrived the very next day in perfect condition. Will definitely shop here again.",
    name: 'Sarah Jenkins',
    role: 'Verified Buyer',
    initials: 'SJ',
    stars: 5,
  },
  {
    id: 2,
    quote: "The product quality is top-notch. Customer service was also very helpful when I needed to exchange a pair of shoes for a different size. Seamless experience.",
    name: 'Michael Chen',
    role: 'Premium Member',
    initials: 'MC',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-8 px-4 bg-slate-50 space-y-6">
      {/* Header section matching image 2 */}
      <div className="text-center max-w-md mx-auto space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-900">
          What Our Customers Say
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Don't just take our word for it. Here is what real shoppers have to say about their experience with Shop Shathi.
        </p>
      </div>

      {/* Review cards */}
      <div className="space-y-4">
        {testimonials.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative space-y-4">
            <div className="flex gap-1 text-amber-400">
              {[...Array(item.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>

            <p className="text-sm italic text-slate-700 leading-relaxed">
              "{item.quote}"
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-sm">
                {item.initials}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                <p className="text-xs text-slate-500">{item.role}</p>
              </div>
            </div>

            <span className="absolute top-4 right-6 text-4xl text-indigo-100 font-serif leading-none select-none">
              “
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}