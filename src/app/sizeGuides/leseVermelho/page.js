'use client'
import { useState } from 'react';
import Head from 'next/head';

export default function SizeGuide() {
  const [activeCategory, setActiveCategory] = useState('women');
  const [activeRegion, setActiveRegion] = useState('us');

  // Sample size data - you'll replace this with your actual data
  const sizeData = {
    women: {
      us: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      eu: ['32', '34', '36', '38', '40', '42'],
      uk: ['4', '6', '8', '10', '12', '14'],
    },
    men: {
      us: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
      eu: ['44', '46', '48', '50', '52', '54'],
      uk: ['34', '36', '38', '40', '42', '44'],
    },
    kids: {
      us: ['2T', '3T', '4T', '5T', '6', '8'],
      eu: ['92', '98', '104', '110', '116', '122'],
      uk: ['2', '3', '4', '5', '6', '8'],
    }
  };

  const measurementData = {
    women: [
      { measurement: 'Bust (inches)', xs: '32', s: '34', m: '36', l: '38', xl: '40', xxl: '42' },
      { measurement: 'Waist (inches)', xs: '24', s: '26', m: '28', l: '30', xl: '32', xxl: '34' },
      { measurement: 'Hip (inches)', xs: '34', s: '36', m: '38', l: '40', xl: '42', xxl: '44' },
    ],
    men: [
      { measurement: 'Chest (inches)', s: '34-36', m: '38-40', l: '42-44', xl: '46-48', xxl: '50-52', '3xl': '54-56' },
      { measurement: 'Waist (inches)', s: '28-30', m: '32-34', l: '36-38', xl: '40-42', xxl: '44-46', '3xl': '48-50' },
    ],
    kids: [
      { measurement: 'Height (cm)', '2t': '92-98', '3t': '98-104', '4t': '104-110', '5t': '110-116', '6': '116-122', '8': '122-128' },
      { measurement: 'Chest (inches)', '2t': '21', '3t': '22', '4t': '23', '5t': '24', '6': '25', '8': '26' },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Size Guide | Your Brand</title>
        <meta name="description" content="Find your perfect fit with our comprehensive size guide" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Size Guide</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your perfect fit with our comprehensive size guide. Compare measurements across different regions and categories.
          </p>
        </div>

        {/* Category Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 flex space-x-1">
            {['women', 'men', 'kids'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-md font-medium capitalize transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Region Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 flex space-x-1">
            {['us', 'eu', 'uk'].map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-6 py-2 rounded-md font-medium uppercase transition-colors ${
                  activeRegion === region
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Size Conversion Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Size Conversion - {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-semibold text-gray-900">Region</th>
                  {sizeData[activeCategory][activeRegion].map((size) => (
                    <th key={size} className="py-3 font-semibold text-gray-900 text-center">
                      {size}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(sizeData[activeCategory]).map(([region, sizes]) => (
                  <tr key={region} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900 uppercase">{region}</td>
                    {sizes.map((size) => (
                      <td key={size} className="py-3 text-center text-gray-600">
                        {size}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Measurement Guide */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Measurement Guide - {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-semibold text-gray-900">Measurement</th>
                  {sizeData[activeCategory][activeRegion].map((size) => (
                    <th key={size} className="py-3 font-semibold text-gray-900 text-center">
                      {size}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {measurementData[activeCategory].map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">{row.measurement}</td>
                    {sizeData[activeCategory][activeRegion].map((size) => (
                      <td key={size} className="py-3 text-center text-gray-600">
                        {row[size.toLowerCase()] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Measure</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Bust/Chest</h4>
              <p className="text-gray-600 text-sm">
                Measure around the fullest part of your bust/chest, keeping the tape horizontal.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Waist</h4>
              <p className="text-gray-600 text-sm">
                Measure around the natural waistline, keeping the tape slightly loose.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Hips</h4>
              <p className="text-gray-600 text-sm">
                Measure around the fullest part of your hips, about 8 inches below your waist.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}