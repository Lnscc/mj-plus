"use client";
import { MessageType } from "@/components/Message";
import { getMessages } from "@/lib/messages";
import { useEffect, useState } from "react";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";

export default function Page() {
    const [images, setImages] = useState<MessageType[]>([]);
    const width = 200;

    useEffect(() => {
        async function init() {
            setImages((await getMessages()).reverse());
        }
        init();
    }, []);

    return (
        <div className="flex flex-wrap">
            {images.map((image) => (
                <div key={image.id} className="p-0">
                    {!image.image_url ? (
                        <div className="flex justify-center items-center w-[200px] h-[200px]">
                            <TailSpin
                                height="80"
                                width="80"
                                color="#00BFFF"
                                ariaLabel="loading"
                            />
                        </div>
                    ) : (
                        <Image
                            src={image.image_url!}
                            alt={image.prompt}
                            width={width}
                            height={width}
                            className="object-cover"
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
