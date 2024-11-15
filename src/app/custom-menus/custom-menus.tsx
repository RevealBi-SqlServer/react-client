import styles from './custom-menus.module.css';
import createClassTransformer from '../style-utils';
import { useEffect } from 'react';

declare var $: any;

export default function CustomMenus() {
  const classes = createClassTransformer(styles);

  useEffect(() => {
    const headers: { [key: string]: string } = {};
    $.ig.RevealSdkSettings.setAdditionalHeadersProvider(function (url: any) {
      headers["x-header-one"] = "ALFKI";
      headers["x-header-two"] = "10248";
      return headers;
    });

    $.ig.RVDashboard.loadDashboard("Market Rents").then((dashboard: any) => {
      const revealView = new $.ig.RevealView('#revealView');
      revealView.interactiveFilteringEnabled = true;
      revealView.dashboard = dashboard;

      revealView.onMenuOpening = function (visualization: any, args: any) {
        for (let i = 0; i < args.menuItems.length; i++) {
          if(args.menuItems[i].title === "Save As") args.menuItems[i].isHidden = true;
        }
        
        if (args.menuLocation === $.ig.RVMenuLocation.Dashboard) {
          const menuItem1 = new $.ig.RVMenuItem(
            "Dashboard Menu Item",
            new $.ig.RVImage(
              "https://i.pinimg.com/736x/03/c8/a2/03c8a2aff8be6bee9064eef9b5d72d66.jpg",
              "Icon"
            ),
            () => {
              alert('my action');
            }
          );
          args.menuItems.push(menuItem1);
       }

        if (args.menuLocation === $.ig.RVMenuLocation.Visualization) {
          if (visualization.title === "Rent vs. Lease Revenue") {
            const menuItem = new $.ig.RVMenuItem(
              "Custom Menu in Rents vs. Lease",
              new $.ig.RVImage(
                "https://i.pinimg.com/736x/03/c8/a2/03c8a2aff8be6bee9064eef9b5d72d66.jpg",
                "Icon"
              ),
              () => {
                alert('my action');
              }
            );
            args.menuItems.push(menuItem);
          }
        }
      };

      revealView.onTooltipShowing = ({ cell, visualization, customItems }) => {
        const icons = ["https://svgsilh.com/svg/26432.svg", "https://svgsilh.com/svg/1879084.svg"];
        const fetchData = (allFields, col, val, isDate, fmt) => {
            fetch(`${baseUrl}dashboards/${dashboardName}/visualizations/${visualization.id}/data?includeAllFields=${allFields}&filterColumn=${col}&filterValue=${val}&isDateFilter=${isDate}&formattedValue=${encodeURIComponent(fmt || '')}`)
                .then(res => res.ok ? window.open('data.html', 'DataPopup', 'width=700,height=800,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes') : alert('API call failed.'))
                .catch(() => alert('An error occurred while calling the API.'));
        };

        const value = cell.value, formattedValue = cell.formattedValue;
        const isDate = !isNaN(Date.parse(value));
        const filterValue = isDate ? new Date(value).toISOString() : value;

        customItems.push(
            new $.ig.RVTooltipItem("Underlying Data", `Show ${formattedValue}`, icons[0], () => fetchData(false, cell.columnName, filterValue, isDate, formattedValue)),
            new $.ig.RVTooltipItem("Underlying Data", `Show All ${visualization.title}`, icons[1], () => fetchData(true, "AllColumns", "AllValues", false, null))
        );
    };


    });
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