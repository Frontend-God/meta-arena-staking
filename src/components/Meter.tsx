/* eslint-disable prettier/prettier */
import { Doughnut } from "react-chartjs-2";

const Meter = ({ value }: { value: number }) => {
  const graphData = {
    datasets: [
      {
        label: "My First Dataset",
        data: [value, 25 - value],
        backgroundColor: ["#00FACE", "#666666"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    elements: {
      arc: {
        weight: 0.5,
        borderWidth: 0,
      },
    },
    cutout: 125,
  };

  return <Doughnut data={graphData} options={options} />;
};

export default Meter;
