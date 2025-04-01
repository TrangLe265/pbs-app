import { createAnimations } from '@tamagui/animations-react-native';
import { createInterFont } from '@tamagui/font-inter';
import { themes, tokens } from '@tamagui/themes';
import { createTamagui, styled, Text, YStack} from 'tamagui';


const animations = createAnimations({
  bouncy: { 
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
});

const headingFont = createInterFont();
const bodyFont = createInterFont();

export const Container = styled(YStack, {
  padding: 24,
  alignItems: 'center', 
  justifyContent: 'center',
});

export const Main = styled(YStack, {
  flex: 1,
  justifyContent: 'space-between',
});

export const Title = styled(Text, {
  fontSize: 30,
  fontWeight: '600',
  color: '$blue4Dark', 
  marginBottom: 10,
  alignItems:'center',
});

export const SubTitle = styled(Text, {
    fontSize: 18,
    fontWeight: '400',
    color: '$blue0Light', 
    marginBottom: 10,
  });
export const LineSeperator = styled(YStack, {
    height: 1,
    width: '100%',
    backgroundColor: '$blue8Light',
    marginVertical: 10,
});
const config = createTamagui({
  light: {
    color: {
      background: '$blue0Light',
      text: 'black',
    },
  },
  defaultFont: 'body',
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  themes,
  tokens,
});

type AppConfig = typeof config;

// Enable auto-completion of props shorthand (ex: jc="center") for Tamagui templates.
// Docs: https://tamagui.dev/docs/core/configuration

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;

