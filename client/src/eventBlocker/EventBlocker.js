
import React from 'react';

const EventBlocker = ({ blockEvents, children }) => {
  const stopEventPropagation = (event) => {
    if (blockEvents) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <div
      onMouseUp={stopEventPropagation}
      onMouseDown={stopEventPropagation}
      onMouseEnter={stopEventPropagation}
      onMouseLeave={stopEventPropagation}
      onClick={stopEventPropagation}
      onTouchStart={stopEventPropagation}
      onTouchEnd={stopEventPropagation}
      onTouchMove={stopEventPropagation}
      onTouchCancel={stopEventPropagation}
    >
      {children}
    </div>
  );
};

export default EventBlocker;
