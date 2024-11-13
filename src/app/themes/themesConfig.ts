// themesConfig.ts
export const themes = [
    { value: "ml", label: "Mountain Light" },
    { value: "md", label: "Mountain Dark" },
    { value: "ol", label: "Ocean Light" },
    { value: "od", label: "Ocean Dark" },
    { value: "red", label: "Red Custom Theme" },
    { value: "dark", label: "Dark Blue Custom Theme" },
    { value: "brown", label: "Brown Custom Theme" },
    { value: "blue", label: "Blue Custom Theme" },
  ];
  
  export const customThemeDetails = {
    red: { accentColor: "#AA375E", font: "Questrial", chartColors: ["#AA375E", "#E87327", "#5C34A4", "#19947C", "#19947C", "#3D3748"] },
    blue: { accentColor: "#0489E0", font: "Montserrat", chartColors: ["#40578C", "#304169", "#EA3421", "#BA2212", "#823AF7", "#5A09DD"] },
    brown: { accentColor: "#64A70B", font: "Inter", chartColors: ["#FFB500", "#F06800", "#66411A", "#64A70B", "#0A8080", "#1D487E"] },
    dark: { accentColor: "#40578C", font: "Roboto", chartColors: ["#40578C", "#304169", "#EA3421","#BA2212","#823AF7","#5A09DD"]},
    };
  

  // $.ig.RevealSdkSettings.setBaseUrl(`${environment.BASE_URL}`);
  // const style = window.getComputedStyle(document.body);
  // const theme = new $.ig.RevealTheme();
  // theme.regularFont = style.getPropertyValue('--ig-font-family').replace(/\s/g, '+') ?? 'sans-serif';
  // theme.mediumFont = theme.regularFont;
  // theme.boldFont = theme.regularFont;
  // //theme.accentColor = '#40578C'; 


  
  
  // theme.fontColor = style.getPropertyValue('--ig-surface-500-contrast');
  // theme.isDark = theme.fontColor !== 'black';
  // theme.dashboardBackgroundColor = '#304169'; //`hsl(${style.getPropertyValue('--ig-gray-100')})`;
  // theme.visualizationBackgroundColor = `hsl(${style.getPropertyValue('--ig-surface-500')})`;
  // theme.useRoundedCorners = false;