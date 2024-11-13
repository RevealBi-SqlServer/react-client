import { IgrCombo, IgrComboModule } from 'igniteui-react';
import { useEffect, useState, useCallback } from 'react';
import { useGetDashboardNamesList } from '../hooks/reveal-server-hooks';
import styles from './viewer.module.css';
import createClassTransformer from '../style-utils';

declare var $: any;
IgrComboModule.register();

export default function Viewer() {
  const classes = createClassTransformer(styles);
  const [_selectedOrderId, setSelectedOrderId] = useState<number | undefined>();
  const [_selectedCustomerId, setSelectedCustomerId] = useState<string | undefined>();
  const { revealServerDashboardNames } = useGetDashboardNamesList();
  const [selectedDashboard, setSelectedDashboard] = useState<string | undefined>();

  const applyHeaders = useCallback(() => {
    const headers: { [key: string]: string } = {
      "x-header-one": _selectedCustomerId || "ALFKI",
      "x-header-two": _selectedOrderId?.toString() || "10248",
    };
    $.ig.RevealSdkSettings.setAdditionalHeadersProvider(() => headers);
  }, [_selectedCustomerId, _selectedOrderId]);

  const loadDashboard = useCallback(
    (dashboardFileName: string) => {
      $.ig.RVDashboard.loadDashboard(dashboardFileName).then((dashboard: any) => {
        const revealView = new $.ig.RevealView('#revealView');
        revealView.interactiveFilteringEnabled = true;
        revealView.dashboard = dashboard;
      });
    },
    []
  );

  const handleComboChange = (_: IgrCombo, event: any) => {
    const newDashboard = event.detail.newValue[0] as string;
    setSelectedDashboard(newDashboard);
  };

  useEffect(() => {
    if (revealServerDashboardNames && revealServerDashboardNames.length > 0 && !selectedDashboard) {
      const initialDashboard = revealServerDashboardNames[0].dashboardFileName;
      setSelectedDashboard(initialDashboard);
    }
  }, [revealServerDashboardNames, selectedDashboard]);

  useEffect(() => {
    applyHeaders();
    if (selectedDashboard) loadDashboard(selectedDashboard);
  }, [applyHeaders, selectedDashboard, loadDashboard]);

  return (
    <div className={classes("column-layout viewer-container")}>
      <div className={classes("column-layout group")}>
        <div className={classes("row-layout group_1")}>
          <p className={classes("typography__body-1 text")}>
            <span>Select a dashboard to view / edit</span>
          </p>
          <IgrCombo
            outlined="true"
            data={revealServerDashboardNames || []}
            valueKey="dashboardFileName"
            displayKey="dashboardTitle"
            singleSelect="true"
            value={selectedDashboard ? [selectedDashboard] : []}
            change={handleComboChange}
            className={classes("single-select-combo")}
          />
        </div>
      </div>
      <div className={classes("column-layout group_2")}>
        <div className={classes("group_3")}>
          <div
            id="revealView"
            style={{
              height: 'calc(100vh - 140px)',
              width: '100%',
              position: 'relative',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}