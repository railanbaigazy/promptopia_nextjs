import Image from "next/image";

const Loading = () => {
    return (
        <div className="w-full flex-center">
            <Image
                src="/assets/icons/loader.svg"
                alt="Loader"
                width={50}
                height={50}
                className="object-contain"
            />
        </div>
    );
};

export default Loading;