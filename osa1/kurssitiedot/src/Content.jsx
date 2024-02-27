import Part from "./Part";

const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => (
        <Part key={part.name} part={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

export default Content;
