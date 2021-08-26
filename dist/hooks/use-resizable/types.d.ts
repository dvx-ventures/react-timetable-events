export declare type ResizeDirection = "left" | "right" | "up" | "down" | "top" | "bottom";
export declare type ResizeDirectionGroup = "horizontal" | "vertical";
export interface IResizableOption {
    direction: ResizeDirection;
    size?: number;
    minSize?: number;
    maxSize?: number;
}
export interface IResizableState extends IResizableOption {
    position?: number;
    initSize?: number;
    isMove?: boolean;
}
export declare const directionGroupMap: Record<ResizeDirection, ResizeDirectionGroup>;
export declare const directionCalcMap: Record<ResizeDirection, number>;
export declare const windowEventTypes: string[];
