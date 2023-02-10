import React from 'react';

const CheckBox = ({ label, name, value, handleChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="link-checkbox"
        name={name}
        checked={value}
        onChange={handleChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />

      <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
