import styles from './basic-view.module.css';
import createClassTransformer from '../style-utils';
import { useEffect } from 'react';

declare var $: any;

export default function BasicView() {
  const classes = createClassTransformer(styles);

  useEffect(() => {
    const headers: { [key: string]: string } = {};

    $.ig.RevealSdkSettings.setAdditionalHeadersProvider(function (url: any) {
      headers["x-header-one"] = "ALFKI";
      headers["x-header-two"] = "10248";
      return headers;
    });

    $.ig.RVDashboard.loadDashboard("Marketing").then((dashboard: any) => {
      var revealView = new $.ig.RevealView('#revealView');
      revealView.interactiveFilteringEnabled = true;
      revealView.dashboard = dashboard;
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