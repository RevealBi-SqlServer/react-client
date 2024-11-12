import { IgrCombo, IgrComboModule } from 'igniteui-react';
import { useEffect, useState } from 'react';
import { useGetCustomersList } from '../hooks/customers-hooks';
import styles from './headers.module.css';
import createClassTransformer from '../style-utils';

declare var $: any;

IgrComboModule.register();

export default function Headers() {
  const classes = createClassTransformer(styles);
  const [_selectedCustomerId, setSelectedCustomerId] = useState<string | undefined>();
  const [value, setValue] = useState<any | undefined>();
  const { customersCustomers } = useGetCustomersList();

  function singleSelectComboChange(_: IgrCombo, event: any) {
    const selectedCustomerId = event.detail.newValue[0] as string;
    setValue(selectedCustomerId);
    setSelectedCustomerId(selectedCustomerId);
  }

  useEffect(() => {
    if (customersCustomers && customersCustomers.length > 0 && !value) {
      const initialCustomerId = customersCustomers[0].CustomerId;
      setValue(initialCustomerId);
      setSelectedCustomerId(initialCustomerId);

      const headers: { [key: string]: string } = {};
      $.ig.RevealSdkSettings.setAdditionalHeadersProvider(function (url: any) {
        headers["x-header-one"] = initialCustomerId;
        return headers;
      });

      $.ig.RVDashboard.loadDashboard('Customer Orders').then((dashboard: any) => {
        const revealView = new $.ig.RevealView('#revealView');
        revealView.dashboard = dashboard;
      });
    }
  }, [customersCustomers, value]); 

  useEffect(() => {
    const headers: { [key: string]: string } = {};
    $.ig.RevealSdkSettings.setAdditionalHeadersProvider(function (url: any) {
      headers["x-header-one"] = _selectedCustomerId || value;
      return headers;
    });

    console.log('Headers', headers);

    if (_selectedCustomerId) {
      $.ig.RVDashboard.loadDashboard('Customer Orders').then((dashboard: any) => {
        const revealView = new $.ig.RevealView('#revealView');
        revealView.dashboard = dashboard;
      });
    }
  }, [_selectedCustomerId]);

  return (
    <>
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
              value={value ? [value] : []}
              change={(s, event) => {
                singleSelectComboChange(s, event);
              }}
              className={classes("single-select-combo")}
            />
          </div>
          <div className={classes("row-layout group_3")}>
          </div>
        </div>
        <div className={classes("column-layout group_4")}>
          <div className={classes("group_5")}>
            <div id='revealView' style={{ height: 'calc(100vh - 145px)', width: '100%', position: 'relative' }}></div>
          </div>
        </div>
      </div>
    </>
  );
}