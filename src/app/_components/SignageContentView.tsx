"use Client";

import Image from "next/image";
import { ContentApiResponse } from "../_types/ContentApiResponse";

type Props = {
  content: ContentApiResponse;
};

const SignageContentView = ({ content }: Props) => {
  return (
    <div className="rounded-lg border border-gray-300 shadow-md">
      This is a content view.
    </div>
  );
};

export default SignageContentView;
