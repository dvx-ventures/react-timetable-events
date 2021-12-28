import * as React from "react";
import { IResizableOption } from "./types";
export default function useResizable(option: IResizableOption): {
    ref: React.RefObject<HTMLElement & HTMLDivElement>;
    isMove: boolean | undefined;
    size: number | undefined;
    handler: (event: React.MouseEvent | React.TouchEvent) => void;
};
