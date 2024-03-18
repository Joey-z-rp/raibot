import { ModelServerMessageContents } from "@/command-interface";

const ObjectBox = ({
  object,
}: {
  object: ModelServerMessageContents["CALCULATED_ENV_UPDATES"]["objects"][number];
}) => {
  const width = object.coordinate[2] - object.coordinate[0];
  const height = object.coordinate[3] - object.coordinate[1];
  const left = object.coordinate[0];
  const top = object.coordinate[1];

  const color = "#00C3AF";

  return (
    <div
      className="absolute border border-2"
      style={{
        width,
        height,
        left,
        top,
        borderColor: color,
      }}
    >
      <div className="absolute flex gap-2" style={{ top: "-20px", color }}>
        <span>{object.name}</span>
        <span>{Math.round(object.confidence * 100) / 100}</span>
        <span>Distance: {object.distance}</span>
        <span>Angle: {object.offCenterAngle}</span>
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
