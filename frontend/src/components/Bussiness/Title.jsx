import React from 'react';

function Title({ title, subtitle }) {
  return (
    <section className="text-center mb-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
      <p className="text-lg text-gray-600">{subtitle}</p>
    </section>
  );
}

export default Title;
