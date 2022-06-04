/* eslint-disable prettier/prettier */
import Confetti from "react-confetti";

import useWindowSize from "hooks/useWindowSize";
import { Size } from "@types";

const ConfettiAnimation = () => {
  const size: Size = useWindowSize();
  return (
    <Confetti
      tweenDuration={10}
      style={{ zIndex: "2000" }}
      colors={["#00FACE", "#e6fffa", "#00997a", "#66ffe0", "#00cca3", "#006652"]}
      width={size.width}
      height={size.height}
    />
  );
};

export default ConfettiAnimation;
