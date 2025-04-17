'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function DynamicListInput({ label, items, setItems, keys, placeholderMap }) {
  const [error, setError] = useState('');

  const handleAdd = () => {
    // Initialize new item with empty values for each key
    const newItem = keys.reduce((obj, key) => ({ ...obj, [key]: '' }), {});
    setItems([...items, newItem]);
    setError('');
  };

  const handleRemove = (index) => {
    if (items.length === 1 && label.includes('Audience Gender')) {
      setError('At least one gender entry is required.');
      return;
    }
    setItems(items.filter((_, i) => i !== index));
    setError('');
  };

  const handleChange = (index, key, value) => {
    const updatedItems = [...items];
    updatedItems[index][key] = value;

    // Validate percentages for audience_gender
    if (label.includes('Audience Gender')) {
      const totalPercentage = updatedItems.reduce(
        (sum, item) => sum + (parseFloat(item.percentage) || 0),
        0
      );
      if (totalPercentage > 100) {
        setError('Total percentage cannot exceed 100%.');
      } else {
        setError('');
      }
    }

    setItems(updatedItems);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2 flex-col sm:flex-row">
          {keys.map((key) => (
            <input
              key={key}
              type={key === 'percentage' || key === 'followers' ? 'number' : 'text'}
              value={item[key] || ''}
              onChange={(e) => handleChange(index, key, e.target.value)}
              placeholder={placeholderMap[key] || key}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          ))}
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="p-2 text-red-600 hover:text-red-700 focus:outline-none"
            disabled={items.length === 1 && label.includes('Audience Gender')}
          >
            <X size={20} />
          </button>
        </div>
      ))}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="button"
        onClick={handleAdd}
        className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
      >
        Add {label}
      </button>
    </div>
  );
}