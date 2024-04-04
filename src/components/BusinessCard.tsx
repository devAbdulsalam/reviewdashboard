import { useState, useRef, Suspense } from 'react';

const Card = ({ data }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const captureThumbnail = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas image to data URL
        const dataURL = canvas.toDataURL();
        console.log(dataURL);
        setThumbnail(dataURL);
      }
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white py-2 px-3 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="size-[400px]">
        <>
          <Suspense
            fallback={
              <img
                src={`https://ui-avatars.com/api/?name=${data?.name}`}
                alt="business logo"
                className="object-contain rounded-t-xl"
              />
            }
          >
            <img
              src={`${data?.logo?.url}`}
              alt="business logo"
              className=" object-contain rounded-t-xl"
            />
          </Suspense>
        </>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <p className="text-sm font-medium">{data?.category}</p>
      </div>
    </div>
  );
};

export default Card;
