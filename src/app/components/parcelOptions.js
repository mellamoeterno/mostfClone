// File: src/app/components/ParcelOptions.jsx
'use client';

export default function ParcelOptions({ total }) {
  const base = parseFloat(total);

  const calculateParcel = (n) => {
    if (n <= 3) {
      return (base / n).toFixed(2);
    } else {
      const rate = 0.035; // 3.5%
      const final = base * Math.pow(1 + rate, n - 3);
      return (final / n).toFixed(2);
    }
  };

  return (
    <div className="space-y-2">
      {[...Array(12)].map((_, i) => {
        const parcel = i + 1;
        const perMonth = calculateParcel(parcel);
        return (
          <div key={parcel} className="flex justify-between border p-2 rounded text-gray-500">
            <span>{parcel}x de R$ {perMonth}</span>
            <span className="text-sm text-gray-500">
              {parcel > 3 ? 'com juros' : 'sem juros'}
            </span>
          </div>
        );
      })}
    </div>
  );
}
