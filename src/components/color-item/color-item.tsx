import "./color-item.scss";

type AppProps = {
  color: string;
};

const ColorItem = ({ color }: AppProps) => (
  <div className="box" style={{ backgroundColor: `#${color}` }}>
    <p>{`#${color}`}</p>
  </div>
);

export default ColorItem;
