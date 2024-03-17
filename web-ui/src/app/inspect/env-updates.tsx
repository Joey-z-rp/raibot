import { ModelServerMessageContents } from "@/command-interface";
import { useMemo } from "react";

const getRandomColor = () => {
  const decimalToHex = (decimal: number) => {
    var hex = decimal.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  var color = "#" + decimalToHex(r) + decimalToHex(g) + decimalToHex(b);
  return color;
};

const ObjectBox = ({
  object,
}: {
  object: ModelServerMessageContents["CALCULATED_ENV_UPDATES"]["objects"][number];
}) => {
  const width = object.coordinate[2] - object.coordinate[0];
  const height = object.coordinate[3] - object.coordinate[1];
  const left = object.coordinate[0];
  const top = object.coordinate[1];

  const borderColor = useMemo(() => getRandomColor(), [...object.coordinate]);

  return (
    <div
      className="absolute border border-2"
      style={{
        width,
        height,
        left,
        top,
        borderColor,
      }}
    >
      <div className="absolute flex gap-2" style={{ top: "-20px" }}>
        <span>{object.name}</span>
        <span>{Math.round(object.confidence * 100) / 100}</span>
        <span>Distance: {Math.round(object.distance)}cm</span>
      </div>
    </div>
  );
};

export const EnvUpdates = ({
  envUpdates,
}: {
  envUpdates: ModelServerMessageContents["CALCULATED_ENV_UPDATES"] | undefined;
}) => {
  if (!envUpdates) return null;

  return (
    <div className="flex">
      <div className="relative">
        <img src={envUpdates.image} />
        {envUpdates.objects.map((object, index) => (
          <ObjectBox key={index} object={object} />
        ))}
      </div>
    </div>
  );
};
