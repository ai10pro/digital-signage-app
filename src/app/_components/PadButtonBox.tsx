"use Client";
import PadButton from "./PadButton";
import { useRouter } from "next/navigation";
type Props = {
  boxName: string;
  styles: {
    name: string;
    color: string;
    hoverColor: string;
    page: string;
    accessible: boolean;
  }[];
};

const PadButtonBox = ({ boxName, styles }: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="text-2xl font-bold">{boxName}</div>
      <div className="mx-2 flex flex-wrap justify-start">
        {styles.map(({ name, color, hoverColor, page, accessible }) => (
          <PadButton
            key={name}
            color={color}
            hoverColor={hoverColor}
            onClick={() => {
              if (accessible) {
                router.push(page);
              } else {
                return;
              }
            }}
            accessible={accessible}
          >
            {name}
          </PadButton>
        ))}
      </div>
    </div>
  );
};

export default PadButtonBox;
