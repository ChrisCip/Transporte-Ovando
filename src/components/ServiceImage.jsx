import React from 'react';

export const ServiceImage = ({ service, className = "" }) => (
  <img
    src={service.imageUrl || "/TransporteLogo.png"}
    alt={service.name}
    className={className}
    loading="lazy"
    onError={(event) => { event.currentTarget.src = "/TransporteLogo.png"; }}
  />
);
