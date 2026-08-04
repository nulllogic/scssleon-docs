// src/components/MyReactComponent.jsx

export default function Snippet(props, { single = false }) {
  return (
    <>
      {single ? <div>{props.children}</div> : <div>{props.children}</div>}
    </>
  );
}