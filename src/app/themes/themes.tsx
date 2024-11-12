import { IgrCombo, IgrComboModule } from 'igniteui-react';
import { useEffect, useState } from 'react';
import styles from './themes.module.css';
import createClassTransformer from '../style-utils';

declare var $: any;
IgrComboModule.register();

const themes = [
  { value: "ml", label: "Mountain Light" },
  { value: "md", label: "Mountain Dark" },
  { value: "ol", label: "Ocean Light" },
  { value: "od", label: "Ocean Dark" },
  { value: "red", label: "Red Custom Theme" },
  { value: "brown", label: "Brown Custom Theme" },
  { value: "blue", label: "Blue Custom Theme" }
];

export default function Themes() {
  const classes = createClassTransformer(styles);
  const [selectedTheme, setSelectedTheme] = useState<string>("ml");

  useEffect(() => {
    const originalTheme = $.ig.RevealSdkSettings.theme;
    loadDashboardWithTheme("Marketing");
    return () => {
      $.ig.RevealSdkSettings.theme = originalTheme;
    };
  }, []);

  const loadDashboardWithTheme = (dashboardName: string) => {
    $.ig.RVDashboard.loadDashboard("Marketing")
      .then((dashboard: any) => {
        const revealView = new $.ig.RevealView("#revealView");
        revealView.refreshTheme; 
        revealView.interactiveFilteringEnabled = true;
        revealView.dashboard = dashboard;
      })
      .catch((error: any) => {
        console.error(`Error loading ${dashboardName} dashboard:`, error);
      });
  };

  const applyTheme = (theme: string) => {
    let newTheme;
    switch (theme) {
      case "ml":
        newTheme = new $.ig.MountainLightTheme();
        break;
      case "md":
        newTheme = new $.ig.MountainDarkTheme();
        break;
      case "ol":
        newTheme = new $.ig.OceanLightTheme();
        break;
      case "od":
        newTheme = new $.ig.OceanDarkTheme();
        break;
      case "red":
        newTheme = createCustomTheme("red", "#AA375E", "Questrial");
        break;
      case "brown":
        newTheme = createCustomTheme("brown", "#64A70B", "Inter");
        break;
      case "blue":
        newTheme = createCustomTheme("blue", "#0489E0", "Montserrat");
        break;
      default:
        newTheme = new $.ig.MountainLightTheme();
    }

    $.ig.RevealSdkSettings.theme = newTheme;
    //const revealView = new $.ig.RevealView("#revealView");
    //revealView.refreshTheme();
    loadDashboardWithTheme("Marketing");
  };

  const createCustomTheme = (themeColor: string, accentColor: string, font: string) => {
    const style = window.getComputedStyle(document.body);
    const theme = new $.ig.RevealTheme();
    theme.regularFont = font;
    theme.mediumFont = font;
    theme.boldFont = font;
    theme.accentColor = accentColor;

    if (themeColor === "red") { // Red theme
      theme.chartColors = ["#AA375E", "#E87327", "#5C34A4", "#19947C", "#19947C", "#3D3748"];
      theme.regularFont = "Questrial";
      theme.mediumFont = "Questrial";
      theme.boldFont = "Questrial";
  } else if (themeColor === "blue") { // Blue theme
      theme.chartColors = ["#40578C", "#304169", "#EA3421", "#BA2212", "#823AF7", "#5A09DD"];
      theme.regularFont = "Montserrat";
      theme.mediumFont = "Montserrat";
      theme.boldFont = "Montserrat";
  } else if (themeColor === "brown") { // Brown theme
      theme.chartColors = ["#FFB500", "#F06800", "#66411A", "#64A70B", "#0A8080", "#1D487E"];
      theme.regularFont = "Inter";
      theme.mediumFont = "Inter";
      theme.boldFont = "Inter";
  };
  
    // theme.fontColor = style.getPropertyValue("--ig-surface-500-contrast");
    // theme.isDark = theme.fontColor !== "black";
    // theme.dashboardBackgroundColor = `hsl(${style.getPropertyValue("--ig-gray-100")})`;
    // theme.visualizationBackgroundColor = `hsl(${style.getPropertyValue("--ig-surface-500")})`;
    theme.useRoundedCorners = true;
    return theme;
};

  const handleThemeChange = (_: IgrCombo, event: any) => {
    const newTheme = event.detail.newValue[0] as string;
    setSelectedTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <>
      <div className={classes("column-layout viewer-container")}>
        <div className={classes("column-layout group")}>
          <div className={classes("row-layout group_1")}>
            <p className={classes("typography__body-1 text")}>
              <span>Select a theme to apply</span>
            </p>
            <IgrCombo
              outlined="true"
              data={themes}
              valueKey="value"
              displayKey="label"
              singleSelect="true"
              change={(s, event) => handleThemeChange(s, event)}
              className={classes("single-select-combo")}
            ></IgrCombo>
          </div>
        </div>
        <div className={classes("column-layout group_2")}>
          <div className={classes("group_3")}>
            <div id="revealView" style={{ height: "calc(100vh - 140px)", width: "100%", position: "relative" }}></div>
          </div>
        </div>
      </div>
    </>
  );
}