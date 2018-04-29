import React from 'react';
const icon = require('glyphicons');

export const starRating = (rating, cssClass) => {
  let stars = '';
  for (let i = 0; i < rating; i++) {
    stars += icon.star + ' '
  }
  return <span className={cssClass}>{stars}</span>
}
