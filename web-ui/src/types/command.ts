import { useServerCommand } from "@/hooks/use-server-command";

export type SendCommand = ReturnType<typeof useServerCommand>["sendCommand"];
