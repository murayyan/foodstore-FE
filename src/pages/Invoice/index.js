import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import { getInvoiceByOrderId } from "../../api/invoice";
import { LayoutOne, Text, Table } from "upkit";
import TopBar from "../../components/TopBar";
import BounceLoader from "react-spinners/BounceLoader";
import { formatCurrency } from "../../utils/format-currency";
import { config } from "../../config";
import StatusLabel from "../../components/StatusLabel";

const Invoice = () => {
  let [invoice, setInvoice] = React.useState(null);
  let [error, setError] = React.useState("");
  let [status, setStatus] = React.useState("process");
  let { params } = useRouteMatch();

  React.useEffect(() => {
    getInvoiceByOrderId(params?.order_id)
      .then(({ data }) => {
        if (data?.error) {
          setError(data.message || "Terjadi kesalahan yang tidakdiketahui");
        }
        setInvoice(data);
      })
      .finally(() => setStatus("idle")); // setStatus menjadi idle
  }, []);
  if (error.length) {
    return (
      <LayoutOne>
        <TopBar />
        <Text as="h3">Terjadi Kesalahan</Text>
        {error}
      </LayoutOne>
    );
  }
  if (status === "process") {
    return (
      <LayoutOne>
        <TopBar />
        <Text as="h3"> Invoice </Text>
        <br />
        <div className="py-10 text-center">
          <div className="inline-block">
            <BounceLoader color="red" />
          </div>
        </div>
      </LayoutOne>
    );
  }

  return (
    <LayoutOne>
      <TopBar />
      <Text as="h3"> Invoice </Text>
      <br />
      <Table
        showPagination={false}
        items={[
          {
            label: "Status",
            value: <StatusLabel status={invoice?.payment_status} />,
          },
          { label: "Order ID", value: "#" + invoice?.order?.order_number },
          { label: "Total amount", value: formatCurrency(invoice?.total) },
          {
            label: "Billed to",
            value: (
              <div>
                {" "}
                <b>{invoice?.user?.full_name} </b> <br />
                {invoice?.user?.email} <br /> <br />
                {invoice?.delivery_address?.detail} <br />
                {invoice?.delivery_address?.village},
                {invoice?.delivery_address?.district} <br />
                {invoice?.delivery_address?.regency} <br />
                {invoice?.delivery_address?.province}
              </div>
            ),
          },
          {
            label: "Payment to",
            value: (
              <div>
                {" "}
                {config.owner} <br /> {config.contact} <br />{" "}
                {config.billing.account_no} <br /> {config.billing.bank_name}
              </div>
            ),
          },
        ]}
        columns={[
          { Header: "Invoice", accessor: "label" },
          { Header: "", accessor: "value" },
        ]}
      />
    </LayoutOne>
  );
};
export default Invoice;
