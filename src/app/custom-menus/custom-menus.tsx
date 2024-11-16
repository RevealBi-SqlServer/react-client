// import styles from './custom-menus.module.css';
// import createClassTransformer from '../style-utils';
// import { useEffect } from 'react';

// declare var $: any;

// export default function CustomMenus() {
//   const classes = createClassTransformer(styles);

//   useEffect(() => {
//     const headers: { [key: string]: string } = {};
//     $.ig.RevealSdkSettings.setAdditionalHeadersProvider(function (url: any) {
//       headers["x-header-one"] = "ALFKI";
//       headers["x-header-two"] = "10248";
//       return headers;
//     });

//     $.ig.RVDashboard.loadDashboard("Market Rents").then((dashboard: any) => {
//       const revealView = new $.ig.RevealView('#revealView');
//       revealView.interactiveFilteringEnabled = true;
//       revealView.dashboard = dashboard;

//       revealView.onMenuOpening = function (visualization: any, args: any) {
//         for (let i = 0; i < args.menuItems.length; i++) {
//           if(args.menuItems[i].title === "Save As") args.menuItems[i].isHidden = true;
//         }
        
//         if (args.menuLocation === $.ig.RVMenuLocation.Dashboard) {
//           const menuItem1 = new $.ig.RVMenuItem(
//             "Dashboard Menu Item",
//             new $.ig.RVImage(
//               "https://i.pinimg.com/736x/03/c8/a2/03c8a2aff8be6bee9064eef9b5d72d66.jpg",
//               "Icon"
//             ),
//             () => {
//               alert('my action');
//             }
//           );
//           args.menuItems.push(menuItem1);
//        }

//         if (args.menuLocation === $.ig.RVMenuLocation.Visualization) {
//           if (visualization.title === "Rent vs. Lease Revenue") {
//             const menuItem = new $.ig.RVMenuItem(
//               "Custom Menu in Rents vs. Lease",
//               new $.ig.RVImage(
//                 "https://i.pinimg.com/736x/03/c8/a2/03c8a2aff8be6bee9064eef9b5d72d66.jpg",
//                 "Icon"
//               ),
//               () => {
//                 alert('my action');
//               }
//             );
//             args.menuItems.push(menuItem);
//           }
//         }
//       };

//     //   revealView.onTooltipShowing = ({ cell, visualization, customItems }) => {
//     //     const icons = ["https://svgsilh.com/svg/26432.svg", "https://svgsilh.com/svg/1879084.svg"];

//     //     const value = cell.value, formattedValue = cell.formattedValue;
//     //     const isDate = !isNaN(Date.parse(value));
//     //     const filterValue = isDate ? new Date(value).toISOString() : value;

//     //     customItems.push(
//     //         new $.ig.RVTooltipItem("Underlying Data", `Show ${formattedValue}`, icons[0], () => fetchData(false, cell.columnName, filterValue, isDate, formattedValue)),
//     //         new $.ig.RVTooltipItem("Underlying Data", `Show All ${visualization.title}`, icons[1], () => fetchData(true, "AllColumns", "AllValues", false, null))
//     //     );
//     // };


//     revealView.onTooltipShowing = ({ cell, visualization, customItems }: { cell: any, visualization: any, customItems: any[] }) => {
//       const icons = ["https://svgsilh.com/svg/26432.svg", "https://svgsilh.com/svg/1879084.svg"];
  
//       const value = cell.value;
//       const formattedValue = cell.formattedValue;
//       const isDate = !isNaN(Date.parse(value));
//       const filterValue = isDate ? new Date(value).toISOString() : value;
  
//       // Add tooltip items with click handlers
//       customItems.push(
//           new $.ig.RVTooltipItem(
//               "Underlying Data",
//               `Show ${formattedValue}`,
//               icons[0],
//               () => {
//                   // Show message box with arguments for the first item
//                   alert(`Cell Value: ${value}\nFormatted Value: ${formattedValue}\nColumn Name: ${cell.columnName}\nFilter Value: ${filterValue}\nIs Date: ${isDate}`);
//               }
//           ),
//           new $.ig.RVTooltipItem(
//               "Underlying Data",
//               `Show All ${visualization.title}`,
//               icons[1],
//               () => {
//                   // Show message box with arguments for the second item
//                   alert(`Visualization Title: ${visualization.title}\nAction: Show All Data`);
//               }
//           )
//       );
//   };
  

//     });
//   }, []);

//   return (
//     <div className={classes("column-layout basic-view-container")}>
//       <div className={classes("column-layout group")}>
//         <div className={classes("group_1")}>
//           <div id='revealView' style={{ height: 'calc(100vh - 75px)', width: '100%', position: 'relative' }}></div>
//         </div>
//       </div>
//     </div>
//   );
// }

import styles from './custom-menus.module.css';
import createClassTransformer from '../style-utils';
import { useEffect } from 'react';

declare var $: any;

export default function CustomMenus() {
  const classes = createClassTransformer(styles);

  useEffect(() => {
    try {
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
          try {
            for (let i = 0; i < args.menuItems.length; i++) {
              if (args.menuItems[i].title === "Save As") args.menuItems[i].isHidden = true;
            }

            if (args.menuLocation === $.ig.RVMenuLocation.Dashboard) {
              const menuItem1 = new $.ig.RVMenuItem(
                "Dashboard Menu Item",
                new $.ig.RVImage(
                  "https://i.pinimg.com/736x/03/c8/a2/03c8a2aff8be6bee9064eef9b5d72d66.jpg",
                  "Icon"
                ),
                () => {
                  alert('Dashboard menu item clicked!');
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
                    alert('Visualization menu item clicked!');
                  }
                );
                args.menuItems.push(menuItem);
              }
            }
          } catch (error) {
            console.error("Error in onMenuOpening:", error);
          }
        };

        // Add tooltip logic
        revealView.onTooltipShowing = ({ cell, visualization, customItems }: { cell: any, visualization: any, customItems: any[] }) => {
          try {
            const icons = ["https://svgsilh.com/svg/26432.svg", "https://svgsilh.com/svg/1879084.svg"];
            const value = cell.value;
            const formattedValue = cell.formattedValue;
            const isDate = !isNaN(Date.parse(value));
            const filterValue = isDate ? new Date(value).toISOString() : value;

            console.log('cell', cell);  
            console.log('visualization', visualization);
            console.log('customItems', customItems);

            customItems.push(
              new $.ig.RVTooltipItem(
                "Cell Args",
                `Show ${formattedValue}`,
                icons[0],
                () => {
                  alert(`Cell Value: ${value}\nFormatted Value: ${formattedValue}\nColumn Name: ${cell.columnName}\nFilter Value: ${filterValue}\nIs Date: ${isDate}`);
                }
              ),
              new $.ig.RVTooltipItem(
                "Viz Args",
                `Show All ${visualization.title}`,
                icons[1],
                () => {
                  alert(`Visualization Title: ${visualization.title}\nAction: Show All Data`);
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
