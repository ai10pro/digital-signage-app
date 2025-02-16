"use client";

import dynamic from "next/dynamic";
import "@splidejs/react-splide/css";
import Image from "next/image";
import { ContentApiResponse } from "../_types/ContentApiResponse";

// SplideとSplideSlideを動的インポートし、サーバーサイドレンダリングを無効にします
const Splide = dynamic(
  () => import("@splidejs/react-splide").then((mod) => mod.Splide),
  { ssr: false }
);
const SplideSlide = dynamic(
  () => import("@splidejs/react-splide").then((mod) => mod.SplideSlide),
  { ssr: false }
);

type Props = {
  contents: ContentApiResponse[];
};

const SignageContentView = ({ contents }: Props) => {
  return (
    <div className="flex h-[91vh] items-center justify-center">
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          autoplay: true,
          interval: 10000,
          arrows: true,
          direction: "ltr",
          height: "91vh",
          speed: 1000,
          easing: "cubic-bezier(.62,0,.28,.74)",
          keyboard: "global",
        }}
        className="w-full"
      >
        {contents.map((content) => (
          <SplideSlide key={content.id}>
            <div className="flex h-full items-center justify-center">
              <Image
                src={content.coverImageURL}
                alt={content.title}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default SignageContentView;
