import { IResizableState, ResizeDirectionGroup } from "./types";
export declare function getPositionFromMouseOrTouch(direction: ResizeDirectionGroup, event: MouseEvent | TouchEvent): number;
export declare const useResizableReducer: (initialState: IResizableState) => [IResizableState, {
    init: (payload: {
        size: number;
    }) => void;
    start: (payload: {
        position: number;
    }) => void;
    move: (payload: {
        position: number;
    }) => void;
    end: VoidFunction;
}];
