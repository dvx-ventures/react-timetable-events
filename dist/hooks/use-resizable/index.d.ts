import * as React from "react";
import { IResizableOption } from "./types";
export default function useResizable(option: IResizableOption): {
    ref: React.RefObject<HTMLElement & HTMLDivElement>;
    size: number | undefined;
    handler: (event: React.MouseEvent | React.TouchEvent) => void;
};
