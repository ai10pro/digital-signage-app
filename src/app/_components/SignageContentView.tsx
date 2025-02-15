"use client";

import { Splide, SplideSlide } from "splide-nextjs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";

import { ContentApiResponse } from "../_types/ContentApiResponse";

type Props = {
  contents: ContentApiResponse[];
};

const SignageContentView = ({ contents }: Props) => {
  return (
    <div className="">
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
        }}
        className="h-full"
      >
        {contents.map((content) => (
          <SplideSlide key={content.id} className="">
            <div className="flex items-center justify-center">
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
