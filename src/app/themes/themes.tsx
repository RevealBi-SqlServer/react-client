import { IgrCombo, IgrComboModule } from 'igniteui-react';
import { useEffect, useState } from 'react';
import styles from './themes.module.css';
import createClassTransformer from '../style-utils';
import { themes } from './themesConfig';
import { applyTheme } from './themeService';

declare var $: any;
IgrComboModule.register();

export default function Themes() {
  const classes = createClassTransformer(styles);
  const [value, setValue] = useState<string | undefined>(themes[0]?.value); 
  const [selectedTheme, setSelectedTheme] = useState<string>(themes[0]?.value || "ml");

  useEffect(() => {
    const originalTheme = $.ig.RevealSdkSettings.theme;
    applyTheme(selectedTheme);
    loadDashboard("Marketing");

    return () => {
      $.ig.RevealSdkSettings.theme = originalTheme;
    };
  }, [selectedTheme]);

  const loadDashboard = (dashboardName: string) => {
    $.ig.RVDashboard.loadDashboard(dashboardName)
      .then((dashboard: any) => {
        const revealView = new $.ig.RevealView("#revealView");
        revealView.interactiveFilteringEnabled = true;
        revealView.dashboard = dashboard;
      })
      .catch((error: any) => {
        console.error(`Error loading ${dashboardName} dashboard:`, error);
      });
  };

  const handleThemeChange = (_: IgrCombo, event: any) => {
    const newTheme = event.detail.newValue[0] as string;
    setValue(newTheme); 
    setSelectedTheme(newTheme);
    applyTheme(newTheme);
    loadDashboard("Marketing");
  };

  return (
    <div className={classes("column-layout viewer-container")}>
      <div className={classes("column-layout group")}>
        <div className={classes("row-layout group_1")}>
          <p className={classes("typography__body-1 text")}>
            <span>Select a theme to apply</span>
          </p>
          <IgrCombo
            outlined="true"
            data={themes}
            value={value ? [value] : []} // Set the initial value of the combo box
            valueKey="value"
            displayKey="label"
            singleSelect="true"
            change={handleThemeChange}
            className={classes("single-select-combo")}
          />
        </div>
      </div>
      <div className={classes("column-layout group_2")}>
        <div className={classes("group_3")}>
          <div id="revealView" style={{ height: "calc(100vh - 140px)", width: "100%", position: "relative" }}></div>
        </div>
      </div>
    </div>
  );
}
