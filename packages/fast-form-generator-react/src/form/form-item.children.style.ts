import { ellipsis } from "@microsoft/fast-jss-utilities";
import {
    applyAriaHiddenStyles,
    applyCleanListStyle,
    applyControl,
    applyControlWrapper,
    applyGlobalStyle,
    applyInputStyle,
    applyLabelStyle,
    applyRemoveItemStyle,
    applySoftRemove,
    colors,
} from "../utilities/";
import { ComponentStyles, CSSRules } from "@microsoft/fast-jss-manager";
import { FormItemChildrenClassNameContract } from "../class-name-contracts/";

const styles: ComponentStyles<FormItemChildrenClassNameContract, {}> = {
    "@global": {
        ...applyGlobalStyle(),
    },
    formItemChildren: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        ...applyControlWrapper(),
    },
    formItemChildren_control: {
        ...applyControl(),
        verticalAlign: "middle",
    },
    formItemChildren_controlLabel: {
        ...applyLabelStyle(),
    },
    formItemChildren_existingChildren: {
        ...applyCleanListStyle(),
    },
    formItemChildren_existingChildren__sorting: {
        fontSize: "11px",
        color: colors.foreground300,
        backgroundColor: `${colors.background100} !important`,
    },
    formItemChildren_existingChildrenItem: {
        position: "relative",
        height: "30px",
        fontSize: "11px",
        display: "flex",
        alignItems: "center",
    },
    formItemChildren_existingChildrenItemLink: {
        width: "calc(100% - 36px)",
        "&$formItemChildren_existingChildrenItemName, &$formItemChildren_existingChildrenItemContent": {
            ...ellipsis(),
            width: "100%",
            display: "inline-block",
            verticalAlign: "bottom",
        },
    },
    formItemChildren_existingChildrenItemName: {},
    formItemChildren_existingChildrenItemContent: {},
    formItemChildren_childrenList: {
        ...applyCleanListStyle(),
        ...applyAriaHiddenStyles(),
        color: colors.foreground300,
        msOverflowStyle: "none",
        background: colors.background100,
        maxHeight: "200px",
        position: "absolute",
        width: "calc(100% - 30px)",
        right: "0",
        left: "0",
        zIndex: "1",
        overflow: "auto",
        "&::-webkit-scrollbar": {
            width: "0 !important",
        },
    },
    formItemChildren_childrenListItem: {
        minHeight: "30px",
        fontSize: "11px",
        lineHeight: "15px",
        display: "flex",
        alignItems: "center",
        padding: "0 5px",
        '&[aria-selected="true"]': {
            background: colors.pink,
        },
    },
    formItemChildren_childrenListControl: {
        position: "relative",
        width: "calc(100% - 30px)",
    },
    formItemChildren_childrenListInput: {
        ...applyInputStyle(),
        paddingRight: "36px",
        width: "100%",
    },
    formItemChildren_childrenListTrigger: {
        position: "absolute",
        right: "0",
        bottom: "0",
        border: "none",
        height: "20px",
        width: "20px",
        outline: "none",
        background: "none",
        "&::before": {
            content: "''",
            position: "absolute",
            top: "9px",
            right: "4px",
            borderLeft: "3px solid transparent",
            borderRight: "3px solid transparent",
            borderTop: `3px solid ${colors.foreground300}`,
        },
    },
    formItemChildren_delete: {
        ...applySoftRemove(),
        cursor: "pointer",
        position: "relative",
        verticalAlign: "middle",
    },
    formItemChildren_deleteButton: {
        ...applyRemoveItemStyle(),
        cursor: "pointer",
    },
};

export default styles;
