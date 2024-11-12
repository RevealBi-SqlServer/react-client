import styles from './basic-view.module.css';
import createClassTransformer from '../style-utils';
import { useEffect, useState } from 'react';

declare var $: any;

export default function BasicView() {
  const classes = createClassTransformer(styles);
  const [selectedDashboard, setSelectedDashboard] = useState<string | undefined>('Healthcare');

  useEffect(() => {
    if (selectedDashboard) {
      $.ig.RVDashboard.loadDashboard(selectedDashboard)
        .then((dashboard: any) => {
          var revealView = new $.ig.RevealView('#revealView');
          revealView.dashboard = dashboard;
        })
        .catch((error: any) => {
          console.error("Error loading dashboard:", error);
        });
    }
  }, [selectedDashboard]);
  

  return (
    <>
      <div className={classes("column-layout basic-view-container")}>
        <div className={classes("column-layout group")}>
          <div className={classes("group_1")}>
          <div id='revealView' style={{ height: 'calc(100vh - 75px)', width: '100%', position: 'relative' }}></div>
          </div>
        </div>
      </div>
    </>
  );
}
