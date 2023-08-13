import React from 'react';

const ElementList = () => {
  const elements = [
    "Élément 1",
    "Élément 2",
    "Élément 3",
    "Élément 4",
    "Élément 5",
    "Élément 6",
    "Élément 7",
    "Élément 8",
    "Élément 9",
    "Élément 10"
  ];

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Liste d'éléments</h1>
      <ul className="w-80 border rounded-md shadow-md">
        {elements.map((element, index) => (
          <li
            key={index}
            className={`py-2 px-4 border-b ${index === elements.length - 1 ? '' : 'border-gray-300'} last:border-0`}
          >
            {element}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ElementList;
