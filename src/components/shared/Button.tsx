import React from 'react';

export default function Button(props: { children?: React.ReactNode }) {
  return <button>{props.children}</button>;
}
