import { IgrCombo, IgrComboModule } from 'igniteui-react';
import { useEffect, useState, useCallback } from 'react';
import { useGetCustomersList } from '../hooks/customers-hooks';
import styles from './headers.module.css';
import createClassTransformer from '../style-utils';

declare var $: any;
IgrComboModule.register();

export default function Headers() {
  const classes = createClassTransformer(styles);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | undefined>();
  const { customersCustomers } = useGetCustomersList();

  const applyHeaders = useCallback(() => {
    const headers: { [key: string]: string } = {
      "x-header-one": selectedCustomerId || "DEFAULT_CUSTOMER",
    };
    $.ig.RevealSdkSettings.setAdditionalHeadersProvider(() => headers);
  }, [selectedCustomerId]);

  const loadDashboard = useCallback(() => {
    $.ig.RVDashboard.loadDashboard('Customer Orders').then((dashboard: any) => {
      const revealView = new $.ig.RevealView('#revealView');
      revealView.interactiveFilteringEnabled = true;
      revealView.dashboard = dashboard;
    });
  }, []);

  const handleComboChange = (_: IgrCombo, event: any) => {
    const selectedId = event.detail.newValue[0] as string;
    setSelectedCustomerId(selectedId);
  };

  useEffect(() => {
    if (customersCustomers && customersCustomers.length > 0 && !selectedCustomerId) {
      const initialCustomerId = customersCustomers[0].CustomerId;
      setSelectedCustomerId(initialCustomerId);
    }
  }, [customersCustomers, selectedCustomerId]);

  useEffect(() => {
    applyHeaders();
    if (selectedCustomerId) loadDashboard();
  }, [applyHeaders, selectedCustomerId, loadDashboard]);

  return (
    <div className={classes("column-layout editor-container")}>
      <div className={classes("row-layout group")}>
        <div className={classes("row-layout group_2")}>
          <p className={classes("typography__body-1 text_1")}>
            <span>Select Customer</span>
          </p>
          <IgrCombo
            outlined="true"
            data={customersCustomers || []}
            valueKey="CustomerId"
            displayKey="CustomerId"
            singleSelect="true"
            value={selectedCustomerId ? [selectedCustomerId] : []}
            change={handleComboChange}
            className={classes("single-select-combo")}
          />
        </div>
      </div>
      <div className={classes("column-layout group_4")}>
        <div className={classes("group_5")}>
          <div
            id="revealView"
            style={{
              height: 'calc(100vh - 145px)',
              width: '100%',
              position: 'relative',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}