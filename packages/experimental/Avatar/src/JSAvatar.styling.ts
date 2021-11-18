import { JSAvatarName, JSAvatarTokens, AvatarSlotProps, JSAvatarProps } from './JSAvatar.types';
import { Theme, UseStylingOptions, buildProps } from '@fluentui-react-native/framework';
import { defaultJSAvatarTokens } from './JSAvatarTokens';
import { ViewStyle } from 'react-native';
import { calculateEffectiveSizes, convertCoinColorFluent, getRingThickness } from './JSAvatar.helpers';

const nameMap: { [key: string]: string } = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
};

export const stylingSettings: UseStylingOptions<JSAvatarProps, AvatarSlotProps, JSAvatarTokens> = {
  tokens: [defaultJSAvatarTokens, JSAvatarName],
  slotProps: {
    root: buildProps(
      (tokens: JSAvatarTokens) => {
        const { physicalSize } = calculateEffectiveSizes(tokens);
        const { horizontalIconAlignment, verticalIconAlignment } = tokens;
        return {
          style: {
            flexDirection: 'row',
            width: physicalSize,
            height: physicalSize,
            justifyContent: nameMap[horizontalIconAlignment || 'end'] as ViewStyle['justifyContent'],
            alignItems: nameMap[verticalIconAlignment || 'end'] as ViewStyle['alignItems'],
            horizontalIconAlignment,
            verticalIconAlignment,
          },
        };
      },
      ['horizontalIconAlignment', 'verticalIconAlignment'],
    ),
    initials: buildProps(
      (tokens: JSAvatarTokens) => {
        const { initialsSize } = calculateEffectiveSizes(tokens);
        return {
          style: {
            fontSize: initialsSize,
          },
        };
      },
      ['initialsSize'],
    ),
    initialsBackground: buildProps(
      (tokens: JSAvatarTokens) => {
        const { physicalSize } = calculateEffectiveSizes(tokens);
        const { backgroundColor, coinColorFluent } = tokens;
        let effectiveBackgroundColor = backgroundColor;
        if (coinColorFluent) {
          effectiveBackgroundColor = convertCoinColorFluent(coinColorFluent);
        }
        return {
          style: {
            borderRadius: physicalSize / 2,
            width: physicalSize,
            height: physicalSize,
            flexGrow: 1,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: effectiveBackgroundColor,
          },
        };
      },
      ['coinColorFluent', 'backgroundColor', 'physicalSize'],
    ),
    photo: buildProps(
      (tokens: JSAvatarTokens) => {
        const { physicalSize } = calculateEffectiveSizes(tokens);

        return {
          style: {
            borderRadius: physicalSize / 2,
            width: physicalSize,
            height: physicalSize,
          },
        };
      },
      ['physicalSize'],
    ),
    icon: buildProps(
      (tokens: JSAvatarTokens, theme: Theme) => {
        const { iconSize, iconStrokeWidth } = calculateEffectiveSizes(tokens);
        const iconSizeAdjusted = iconSize + iconStrokeWidth * 2;
        const iconStrokeColor = tokens.iconStrokeColor || theme.colors.background;
        return {
          style: {
            position: 'absolute',
            width: iconSizeAdjusted,
            height: iconSizeAdjusted,
            bottom: -iconStrokeWidth,
            end: -iconStrokeWidth,
            borderRadius: iconSizeAdjusted / 2,
            borderWidth: iconStrokeWidth,
            borderColor: iconStrokeColor,
          },
        };
      },
      ['iconSize', 'iconStrokeWidth', 'iconStrokeColor'],
    ),
    ring: buildProps(
      (tokens: JSAvatarTokens, theme: Theme) => {
        const { physicalSize } = calculateEffectiveSizes(tokens);
        const { ring } = tokens;

        if (!ring) return {};

        const innerGap = ring.innerGap != undefined ? getRingThickness(ring.innerGap) : getRingThickness(ring.ringThickness || 'xxlarge');

        const effectiveRingThickness = 2 * getRingThickness(ring.ringThickness || 'xxlarge') + innerGap;
        const effectiveSize = physicalSize + 2 * effectiveRingThickness;
        const ringColor = ring.ringBackgroundColor || theme.colors.personaActivityRing;
        return {
          style: {
            borderStyle: 'solid',
            borderColor: ringColor,
            borderWidth: effectiveRingThickness,
            borderRadius: effectiveSize / 2,
            width: effectiveSize,
            height: effectiveSize,
            position: 'absolute',
            top: -effectiveRingThickness,
            left: -effectiveRingThickness,
          },
        };
      },
      ['physicalSize', 'ring', 'physicalSize'],
    ),
    glow: buildProps(
      (tokens: JSAvatarTokens, theme: Theme) => {
        const { physicalSize } = calculateEffectiveSizes(tokens);
        const { ring } = tokens;

        if (!ring) return {};

        const innerGap = ring.innerGap != undefined ? getRingThickness(ring.innerGap) : getRingThickness(ring.ringThickness || 'xxlarge');

        const effectiveRingThickness = getRingThickness(ring.ringThickness || 'xxlarge') + innerGap;
        const effectiveSize = physicalSize + 2 * effectiveRingThickness;
        const glowColor = ring.accent ? theme.colors.accentButtonBackground : ring.ringColor || theme.colors.personaActivityGlow;
        return {
          style: {
            borderStyle: 'solid',
            borderColor: glowColor,
            borderWidth: effectiveRingThickness - innerGap,
            borderRadius: effectiveSize / 2,
            width: effectiveSize,
            height: effectiveSize,
            position: 'absolute',
            top: -effectiveRingThickness,
            left: -effectiveRingThickness,
          },
        };
      },
      ['physicalSize', 'ring'],
    ),
  },
};