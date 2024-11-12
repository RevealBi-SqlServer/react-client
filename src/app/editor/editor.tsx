import { IgrCombo, IgrComboModule } from 'igniteui-react';
import { useEffect, useState } from 'react';
import { useGetCustomersList } from '../hooks/customers-hooks';
import { useGetOrdersList } from '../hooks/orders-hooks';
import styles from './editor.module.css';
import createClassTransformer from '../style-utils';

declare var $: any;

IgrComboModule.register();

export default function Editor() {
  const classes = createClassTransformer(styles);
  const [_selectedOrderId, setSelectedOrderId] = useState<number | undefined>();
  const [_selectedCustomerId, setSelectedCustomerId] = useState<string | undefined>();
  const [value, setValue] = useState<any | undefined>("ALFKI");
  const [value1, setValue1] = useState<any | undefined>(10248);
  const { customersCustomers } = useGetCustomersList();
  const { ordersOrders } = useGetOrdersList();

  function singleSelectComboChange(_: IgrCombo, event: any) {
    setSelectedCustomerId(event.detail.newValue[0] as string);
  }

  function singleSelectComboChange1(_: IgrCombo, event: any) {
    setSelectedOrderId(event.detail.newValue[0] as number);
  }

  useEffect(() => {
    const headers: { [key: string]: string | number | undefined } = {};
  
    $.ig.RevealSdkSettings.setAdditionalHeadersProvider(function (url: any) {
      headers["x-header-one"] = _selectedCustomerId || value;
      headers["x-header-two"] = _selectedOrderId ||  value1;
      return headers;
    });
  
    const revealView = new $.ig.RevealView('#revealView');
    revealView.interactiveFilteringEnabled = true;

    revealView.startInEditMode = true;
  
    revealView.onDataSourcesRequested = (callback: any) => {
      var sqlDs = new $.ig.RVAzureSqlDataSource();
      sqlDs.id="sqlServer";
      sqlDs.title = "SQL Server Data Source";
      sqlDs.subtitle = "Full Northwind Database";

      var dsi1 = new $.ig.RVAzureSqlDataSourceItem(sqlDs);
      dsi1.id="CustOrderHist";
      dsi1.title = "Customer Orders History Stored Proc";
      dsi1.subtitle = "CustomerId Parameter";

      var dsi2 = new $.ig.RVAzureSqlDataSourceItem(sqlDs);
      dsi2.id="CustOrdersOrders";
      dsi2.title = "Customer Orders Stored Proc";
      dsi2.subtitle = "CustomerId Parameter";

      var dsi3 = new $.ig.RVAzureSqlDataSourceItem(sqlDs);
      dsi3.id="TenMostExpensiveProducts";
      dsi3.title = "Ten Most Expensive Products";
      dsi3.subtitle = "Stored Procedure";  
      
      var dsi4 = new $.ig.RVAzureSqlDataSourceItem(sqlDs);
      dsi4.id="CustomerOrders";
      dsi4.title = "Customer Orders";
      dsi4.subtitle = "OrderId Parameter";
  
      callback(new $.ig.RevealDataSources([sqlDs], [dsi1, dsi2, dsi3, dsi4], false));
    };
  }, [_selectedCustomerId, _selectedOrderId]);

  return (
    <>
      <div className={classes("column-layout editor-container")}>
        <div className={classes("row-layout group")}>
          <div className={classes("row-layout group_1")}>
            <p className={classes("typography__body-1 text")}>
              <span>Select items from the combo box to use as query parameters</span>
            </p>
          </div>
          <div className={classes("row-layout group_2")}>
            <p className={classes("typography__body-1 text_1")}>
              <span>Customer</span>
            </p>        
            <IgrCombo
              outlined="true"
              data={customersCustomers}
              valueKey="CustomerId"
              displayKey="CustomerId"
              singleSelect="true"
              value={value ? [value] : []}
              change={(s, event) => {
                setValue(event.detail.newValue[0]);
                singleSelectComboChange(s, event);
              }}
              className={classes("single-select-combo")}
            />

          </div>
          <div className={classes("row-layout group_3")}>
            <p className={classes("typography__body-1 text_1")}>
              <span>Order</span>
            </p>
            <IgrCombo
                outlined="true"
                data={ordersOrders}
                valueKey="OrderID"
                displayKey="OrderID"
                singleSelect="true"
                value={value1 ? [value1] : []}
                change={(s, event) => {
                  setValue1(event.detail.newValue[0]);
                  singleSelectComboChange1(s, event);
                }}
                className={classes("single-select-combo_1")}
              />

          </div>
        </div>
        <div className={classes("column-layout group_4")}>
          <div className={classes("group_5")}>
          <div id='revealView' style={{ height: 'calc(100vh - 140px)', width: '100%', position: 'relative' }}></div>
          </div>
        </div>
      </div>
    </>
  );
}
