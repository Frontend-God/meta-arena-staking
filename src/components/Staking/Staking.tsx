/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/alt-text */
import styled, { keyframes } from "styled-components";
import Image from "next/image";

import StakingImage from "../../assets/images/Token_Flat.svg";

const StakingContainer = styled.div`
  background: linear-gradient(180deg, #292a34 50%, #646464 100%);
  width: 100%;
  height: 100%;
  position: relative;
`;

const StakingAnimation1 = keyframes`
  0% {
      top: 80px;
  }
  30% {
      top: 20px;
  }
  75% {
    top: 20px;
  }
  100% {
      top: 80px;
  }
`;

const StakingAnimation2 = keyframes`
  0% {
      top: 100px;
  }
  45% {
      top: 70px;
  }
  70% {
    top: 70px;
  }
  100% {
      top: 100px;
  }
`;

const StakingAnimation3 = keyframes`
  0% {
      top: 120px;
  }
  65% {
      top: 110px;
  }
  65% {
    top: 110px;
  }
  100% {
      top: 120px;
  }
`;

// const StakingAnimation4 = keyframes`
//   0% {
//       top: 140px;
//   }
//   45% {
//       top: 95px;
//   }
//   70% {
//     top: 95px;
//   }
//   100% {
//       top: 140px;
//   }
// `;

// const StakingAnimation5 = keyframes`
//     0% {
//         top: 160px;
//     }
//     50% {
//         top: 135px;
//     }
//     65% {
//       top: 135px;
//     }
//     100% {
//         top: 160px;
//     }
// `;

const ImageContainer1 = styled.div`
  width: 55%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
  z-index: 10;
  animation: ${StakingAnimation1} 1.6s infinite;
`;

const ImageContainer2 = styled(ImageContainer1)`
  top: 100px;
  z-index: 8;
  animation: ${StakingAnimation2} 1.6s infinite;
`;

const ImageContainer3 = styled(ImageContainer1)`
  z-index: 7;
  top: 120px;
  animation: ${StakingAnimation3} 1.6s infinite;
`;

const ImageContainer4 = styled(ImageContainer1)`
  z-index: 6;
  top: 140px;
  animation: none !important;
`;

const ImageContainer5 = styled(ImageContainer1)`
  z-index: 5;
  top: 160px;
  animation: none !important;
`;

const ImageContainer6 = styled(ImageContainer1)`
  z-index: 4;
  top: 180px;
  animation: none !important;
`;

const Staking = () => {
  return (
    <StakingContainer>
      <ImageContainer1>
        <Image src={StakingImage} layout="responsive" />
      </ImageContainer1>
      <ImageContainer2>
        <Image src={StakingImage} layout="responsive" />
      </ImageContainer2>
      <ImageContainer3>
        <Image src={StakingImage} layout="responsive" />
      </ImageContainer3>
      <ImageContainer4>
        <Image src={StakingImage} layout="responsive" />
      </ImageContainer4>
      <ImageContainer5>
        <Image src={StakingImage} layout="responsive" />
      </ImageContainer5>
      <ImageContainer6>
        <Image src={StakingImage} layout="responsive" />
      </ImageContainer6>
    </StakingContainer>
  );
};

export default Staking;
