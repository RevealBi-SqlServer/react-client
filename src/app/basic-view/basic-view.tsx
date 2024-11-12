import styles from './basic-view.module.css';
import createClassTransformer from '../style-utils';
import { useEffect, useState } from 'react';

declare var $: any;

export default function BasicView() {
  const classes = createClassTransformer(styles);
  const [selectedDashboard, setSelectedDashboard] = useState<string | undefined>('Marketing');
  const [_selectedOrderId, setSelectedOrderId] = useState<number | undefined>();
  const [_selectedCustomerId, setSelectedCustomerId] = useState<string | undefined>();
  
  useEffect(() => {

    const headers: { [key: string]: string } = {};
  
    $.ig.RevealSdkSettings.setAdditionalHeadersProvider(function (url: any) {
      headers["x-header-one"] = _selectedCustomerId || "ALFKI";
      headers["x-header-two"] = _selectedOrderId?.toString() || "10248";
      return headers;
    });

    $.ig.RVDashboard.loadDashboard(selectedDashboard).then((dashboard: any) => {
      var revealView = new $.ig.RevealView('#revealView');
      revealView.interactiveFilteringEnabled = true;
      revealView.dashboard = dashboard;
  });
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
