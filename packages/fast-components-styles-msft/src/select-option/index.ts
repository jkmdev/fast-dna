import designSystemDefaults, {
    DesignSystem,
    withDesignSystemDefaults,
} from "../design-system";
import { ComponentStyles, ComponentStyleSheet } from "@microsoft/fast-jss-manager";
import { SelectOptionClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { density } from "../utilities/density";
import {
    disabledContrast,
    ensureForegroundNormal,
    ensureNormalContrast,
    hoverContrast,
} from "../utilities/colors";
import { applyFocusVisible } from "@microsoft/fast-jss-utilities";
import { applyTypeRampConfig } from "../utilities/typography";
import typographyPattern from "../patterns/typography";
import {
    applyLocalizedProperty,
    contrast,
    Direction,
    ellipsis,
    toPx,
} from "@microsoft/fast-jss-utilities";
import { curry } from "lodash-es";

const styles: ComponentStyles<SelectOptionClassNameContract, DesignSystem> = (
    config: DesignSystem
): ComponentStyleSheet<SelectOptionClassNameContract, DesignSystem> => {
    type ContrastFunction = (operandColor: string, referenceColor: string) => string;
    const designSystem: DesignSystem = withDesignSystemDefaults(config);
    const direction: Direction = designSystem.direction;
    const contrastScale: number = designSystem.contrast;
    const brandColor: string = designSystem.brandColor;
    const color: string = designSystem.foregroundColor;
    const scaledEnsureNormalContrast: ContrastFunction = curry(ensureNormalContrast)(
        contrastScale
    );
    const primaryRestBackgroundColor: string = scaledEnsureNormalContrast(
        scaledEnsureNormalContrast(brandColor, designSystem.backgroundColor),
        color
    );
    const primaryDisabledBackground: string = disabledContrast(
        contrastScale,
        primaryRestBackgroundColor,
        designSystem.backgroundColor
    );
    const primaryDisabledColor: string = disabledContrast(
        contrastScale,
        color,
        primaryDisabledBackground
    );
    const primarySelectedBackground: string = contrast(
        1.7,
        designSystem.foregroundColor,
        designSystem.backgroundColor
    );
    return {
        selectOption: {
            listStyleType: "none",
            height: density(32),
            display: "grid",
            gridTemplateColumns: `${applyLocalizedProperty(
                "12px auto auto 1fr 12px",
                "12px 1fr auto auto 12px",
                direction
            )}`,
            gridTemplateRows: "auto",
            alignItems: "center",
            padding: "0",
            margin: "0 4px",
            ...typographyPattern.rest,
            whiteSpace: "nowrap",
            overflow: "hidden",
            cursor: "default",
            ...applyTypeRampConfig("t7"),
            background: designSystem.backgroundColor,
            borderRadius: toPx(designSystem.cornerRadius),
            border: "2px solid transparent",
            ...applyFocusVisible({
                borderColor: ensureForegroundNormal,
            }),
            "&:hover": {
                background: hoverContrast(
                    designSystem.contrast,
                    designSystem.backgroundColor
                ),
            },
        },
        selectOption_contentRegion: {
            gridColumnStart: "3",
            overflow: "hidden",
            ...ellipsis(),
        },
        selectOption_glyph: {
            gridColumnStart: `${applyLocalizedProperty("2", "4", direction)}`,
            display: "inline-block",
            position: "relative",
            maxWidth: "16px",
            margin: `${applyLocalizedProperty("0 12px 0 0", "0 0 0 12px", direction)}`,
        },
        selectOption__disabled: {
            cursor: "not-allowed",
            ...typographyPattern.disabled,
            "&:hover": {
                background: designSystem.backgroundColor,
            },
            ...applyFocusVisible({
                background: designSystem.backgroundColor,
            }),
            "& $selectOption_glyph": {
                fill: primaryDisabledColor,
            },
        },
        selectOption__selected: {
            background: primarySelectedBackground,
            "&:hover": {
                background: primarySelectedBackground,
            },
        },
    };
};

export default styles;
