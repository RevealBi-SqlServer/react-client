import { customThemeDetails } from './themesConfig';

declare var $: any;

export function applyTheme(themeKey: string) {
  const { MountainLightTheme, MountainDarkTheme, OceanLightTheme, OceanDarkTheme, RevealTheme, RevealSdkSettings } = $.ig;

  let theme;
  switch (themeKey) {
    case "ml":
      theme = new MountainLightTheme();
      break;
    case "md":
      theme = new MountainDarkTheme();
      break;
    case "ol":
      theme = new OceanLightTheme();
      break;
    case "od":
      theme = new OceanDarkTheme();
      break;
    default:
      if (["red", "blue", "brown", "dark"].includes(themeKey)) {
        theme = createCustomTheme(themeKey as ThemeKey);
      } else {
        console.error(`Invalid theme key: ${themeKey}`);
        return;
      }
  }
  
  RevealSdkSettings.theme = theme;
}

type ThemeKey = 'red' | 'blue' | 'brown' | 'dark'; 

function createCustomTheme(themeKey: ThemeKey) {
  const { accentColor, font, chartColors } = customThemeDetails[themeKey];
  const theme = new $.ig.RevealTheme();

  theme.accentColor = accentColor;
  theme.regularFont = font;
  theme.mediumFont = font;
  theme.boldFont = font;
  theme.chartColors = chartColors;
  theme.useRoundedCorners = true;

  if (themeKey === "dark") {
    theme.isDark = true;
    theme.dashboardBackgroundColor = "#304169";
    theme.visualizationBackgroundColor = "#131a2a";
    theme.fontColor = "#ffffff";
  }

  return theme;
}
