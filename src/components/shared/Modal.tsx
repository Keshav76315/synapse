import React from 'react';

export default function Modal(props: { children?: React.ReactNode }) {
  return <div className="modal">{props.children}</div>;
}
