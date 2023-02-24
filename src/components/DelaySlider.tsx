import { Slider } from "@mui/material";

interface DelaySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const DelaySlider: React.FC<DelaySliderProps> = ({ value, onChange }) => {
  const handleSliderChange = (event: any) => {
    onChange(parseInt(event.target.value, 10));
  };

  return (
    <div className="container">
      <label htmlFor="delaySlider">Delay:</label>
      <Slider
        className="svwlider"
        style={{width: "50vw"}}
        value={value}
        onChange={handleSliderChange}
        min={0}
        max={5000}
        step={100}
        marks
        aria-labelledby="slider"
      />
      <div>{value} ms</div>
    </div>
  );
};

export default DelaySlider;

