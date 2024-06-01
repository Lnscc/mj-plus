import Image from "next/image";
import { TailSpin } from "react-loader-spinner";

export default function Message({ message }: { message: MessageType }) {
  const width = window.innerWidth > 500 ? 500 : window.innerWidth;
  return (
    <div>
      {message.prompt} {message.hash}{" "}
      {message.progress === "100%" ? "✅" : message.progress}
      <div
        style={{ width: width, height: width, position: "relative" }}
        className="bg-gray-950/10"
      >
        {!message.image_url ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <TailSpin
              height="80"
              width="80"
              color="#00BFFF"
              ariaLabel="loading"
            />
          </div>
        ) : (
          <Image
            src={message.image_url!}
            alt={message.prompt}
            width={width}
            height={width}
          />
        )}
      </div>
    </div>
  );
}

export type MessageType = {
  id: number;
  progress: string;
  prompt: string;
  image_url: string | null;
  hash: string | null;
};
