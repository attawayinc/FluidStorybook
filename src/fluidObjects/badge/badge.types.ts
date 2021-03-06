/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { IIconProps, IColor } from "office-ui-fabric-react";
import { SharedCell } from "@fluidframework/cell";
import { SharedMap } from "@fluidframework/map";
import { SharedObjectSequence } from "@fluidframework/sequence";

export interface IBadgeType {
    key: string;
    text: string;
    iconProps: IIconProps;
}

export interface IBadgeHistory {
    value: IBadgeType;
    timestamp: Date;
}

export interface IBadgeModel {
    currentCell: SharedCell;
    optionsMap: SharedMap;
    historySequence: SharedObjectSequence<IBadgeHistory>;
}

export interface IBadgeClientProps {
    model: IBadgeModel;
}

export interface IBadgeViewProps {
    options: IBadgeType[];
    historyItems: IBadgeHistory[];
    selectedOption: string | number;
    addOption: (text: string, color: IColor) => void;
    changeSelectedOption: (item: IBadgeType) => void;
}
