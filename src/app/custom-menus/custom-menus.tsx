import styles from './custom-menus.module.css';
import createClassTransformer from '../style-utils';
import { useEffect } from 'react';

declare var $: any;

export default function CustomMenus() {
  const classes = createClassTransformer(styles);


  useEffect(() => {
    try {
      const headers = {};
      $.ig.RevealSdkSettings.setAdditionalHeadersProvider(function (url) {
        headers["x-header-one"] = "ALFKI";
        headers["x-header-two"] = "10248";
        return headers;
      });
  
      $.ig.RVDashboard.loadDashboard("Market Rents").then((dashboard) => {
        const revealView = new $.ig.RevealView('#revealView');
        revealView.interactiveFilteringEnabled = true;
        revealView.dashboard = dashboard;
  
        // Store widget data by WidgetId
        const widgetDataMap = {};
  
        revealView.onDataReceived = async () => {
          const widgets = revealView._dashboardView.__widgets;
  
          // Populate widgetDataMap with table data for each widget
          widgets.forEach((widget) => {
            const widgetId = widget._widget?._id; // Get widget ID
            if (widgetId) {
              const tableData = widget.data()?.toJson(); // Get table data
              widgetDataMap[widgetId] = tableData; // Store by widgetId
            }
          });
  
          console.log('Widget Data Map:', widgetDataMap); // Debug: Log the stored data
        };
  
        // Tooltip logic
        revealView.onTooltipShowing = ({ cell, visualization, customItems }) => {
          try {
            const icons = ["https://svgsilh.com/svg/26432.svg", "https://svgsilh.com/svg/1879084.svg"];
  
            // First Tooltip: Cell Args
            customItems.push(
              new $.ig.RVTooltipItem(
                "Cell Args",
                `Show ${cell.formattedValue}`,
                icons,
                () => {
                  const value = cell.value;
                  const formattedValue = cell.formattedValue;
                  const isDate = !isNaN(Date.parse(value));
                  const filterValue = isDate ? new Date(value).toISOString() : value;
  
                  alert(`Cell Value: ${value}\nFormatted Value: ${formattedValue}\nColumn Name: ${cell.columnName}\nFilter Value: ${filterValue}\nIs Date: ${isDate}`);
                }
              )
            );
  
            // Second Tooltip: Viz Args
            customItems.push(
              new $.ig.RVTooltipItem(
                "Viz Args",
                `Show All ${visualization.title}`,
                icons,
                () => {
                  const widgetId = visualization.id; // Visualization ID
                  const tableData = widgetDataMap[widgetId]; // Retrieve data for this widgetId
  
                  console.log(`Visualization ID: ${widgetId}`);
                  console.log(`Table Data for Visualization:`, tableData);
  
                  // Check if tableData and DataColumns exist
                  if (tableData && Array.isArray(tableData.DataColumns) && tableData.DataColumns.length > 0) {
                    // Format the table data for alert display
                    const messageParts = tableData.DataColumns.map((column) => {
                      const label = column.Label;
                      const formattedValues = column.Cells.map((cell) => cell.FormattedValue).join(', ');
                      return `${label}: ${formattedValues}`;
                    });
  
                    const message = messageParts.join('\n\n');
                    alert(`Visualization Title: ${visualization.title}\n\n${message}`);
                  } else {
                    console.warn(`No data available for widget ID: ${widgetId}`);
                    alert(`No data available for widget with ID: ${widgetId}`);
                  }
                }
              )
            );
          } catch (error) {
            console.error("Error in onTooltipShowing:", error);
          }
        };
      });
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, []);
  
  
  

  return (
    <div className={classes("column-layout basic-view-container")}>
      <div className={classes("column-layout group")}>
        <div className={classes("group_1")}>
          <div id='revealView' style={{ height: 'calc(100vh - 75px)', width: '100%', position: 'relative' }}></div>
        </div>
      </div>
    </div>
  );
}
