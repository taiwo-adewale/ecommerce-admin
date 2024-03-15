import Image, { StaticImageData } from "next/image";

type Props = {
  image: StaticImageData | string;
  children: React.ReactNode;
};

export default function FormTemplate({ image, children }: Props) {
  return (
    <section>
      <div className="p-6 min-h-dvh flex items-center">
        <div className="bg-popover w-full max-w-md lg:max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-lg shadow-xl">
          <div className="relative min-h-[16rem] md:min-h-[18rem] lg:min-h-[28rem]">
            <Image
              src={image}
              alt=""
              placeholder="blur"
              className="w-full object-cover object-center brightness-90"
              fill
            />
          </div>

          <div className="p-6 md:p-12 flex items-center">{children}</div>
        </div>
      </div>
    </section>
  );
}
