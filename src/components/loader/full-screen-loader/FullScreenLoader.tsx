import { RotatingLines } from "react-loader-spinner";

const FullScreenLoader = () => {

  return (
    <>
      <div className="w-full flex align-center justify-center">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    </>
  )
}

export default FullScreenLoader;