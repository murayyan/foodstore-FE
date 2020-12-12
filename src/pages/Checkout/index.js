import * as React from "react";
import { LayoutOne, Text, Steps, Table, Button, Responsive } from "upkit";
import TopBar from "../../components/TopBar";
import FaCartPlus from "@meronex/icons/fa/FaCartPlus";
import FaAddressCard from "@meronex/icons/fa/FaAddressCard";
import FaInfoCircle from "@meronex/icons/fa/FaInfoCircle";
import { useSelector } from "react-redux";
import { config } from "../../config";
import { formatCurrency } from "../../utils/format-currency";
import { sumPrice } from "../../utils/sum-price";
import FaArrowRight from "@meronex/icons/fa/FaArrowRight";
import { useAddressData } from "../../hooks/address";
import { Link } from "react-router-dom";
import FaArrowLeft from "@meronex/icons/fa/FaArrowLeft";
import FaRegCheckCircle from "@meronex/icons/fa/FaRegCheckCircle";

const IconWrapper = () => {
  return <div className="flex justify-center text-3xl"></div>;
};

const steps = [
  {
    label: "Item",
    icon: (
      <IconWrapper>
        <FaCartPlus />
      </IconWrapper>
    ),
  },
  {
    label: "Alamat",
    icon: (
      <IconWrapper>
        <FaAddressCard />
      </IconWrapper>
    ),
  },
  {
    label: "Konfirmasi",
    icon: (
      <IconWrapper>
        <FaInfoCircle />
      </IconWrapper>
    ),
  },
];
const product = (item) => (
  <div className="flex items-center">
    <img
      src={`${config.api_host}/upload/${item.image_url}`}
      width={48}
      alt={item.name}
    />
    {item.name}
  </div>
);
const price = (item) => <span> @ {formatCurrency(item.price)} </span>;
const subtotal = (item) => {
  return <div>{formatCurrency(item.price * item.qty)} </div>;
};

const columns = [
  {
    Header: "Nama Produk",
    accessor: product,
  },
  {
    Header: "Jumlah",
    accessor: "qty",
  },
  {
    Header: "Harga satuan",
    id: "price",
    accessor: price,
  },
  {
    Header: "Harga total",
    id: "subtotal",
    accessor: subtotal,
  },
];

const address = (addr) => {
  return (
    <div>
      {" "}
      {addr.name} <br />{" "}
      <small>
        {addr.province}, {addr.regency}, {addr.district}, {addr.village} <br />
        {addr.detail}
      </small>
    </div>
  );
};

const addressColumns = [
  {
    Header: "Nama alamat",
    accessor: address,
  },
];

const Checkout = () => {
  let [activeStep, setActiveStep] = React.useState(0);
  let cart = useSelector((state) => state.cart);
  let [selectedAddress, setSelectedAddress] = React.useState(null);
  let { data, status, limit, page, count, setPage } = useAddressData();
  return (
    <LayoutOne>
      <TopBar />
      <Text as="h3"> Checkout </Text>
      <Steps steps={steps} active={activeStep}></Steps>
      <br />
      <br />
      {activeStep === 0 ? (
        <div>
          <br /> <br />
          <Table
            items={cart}
            columns={columns}
            perPage={cart.length}
            showPagination={false}
          />
          <br />
          <div className="text-right">
            <Text as="h4">Subtotal: {formatCurrency(sumPrice(cart))}</Text>

            <br />
            <Button
              onClick={() => setActiveStep(activeStep + 1)}
              color="red"
              iconAfter={<FaArrowRight />}
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      ) : null}

      {activeStep === 1 ? (
        <div>
          <Table
            items={data}
            columns={addressColumns}
            perPage={limit}
            page={page}
            onPageChange={(page) => setPage(page)}
            totalItems={count}
            isLoading={status === "process"}
            selectable
            primaryKey={"_id"}
            selectedRow={selectedAddress}
            onSelectRow={(item) => setSelectedAddress(item)}
          />
          {!data.length && status === "success" ? (
            <div className="my-10 text-center">
              <Link to="/alamat-pengiriman/tambah">
                Kamu belum memiliki alamat pengiriman <br /> <br />
                <Button> Tambah alamat </Button>
              </Link>
            </div>
          ) : null}
          <br />
          <br />
          <Responsive desktop={2} tablet={2} mobile={2}>
            <div>
              <Button
                onClick={() => setActiveStep(activeStep - 1)}
                color="gray"
                iconBefore={<FaArrowLeft />}
              >
                Sebelumnya
              </Button>
            </div>
            <div className="text-right">
              <Button
                onClick={() => setActiveStep(activeStep + 1)}
                disabled={!selectedAddress}
                color="red"
                iconAfter={<FaArrowRight />}
              >
                Selanjutnya
              </Button>
            </div>
          </Responsive>
        </div>
      ) : null}

      {activeStep === 2 ? (
        <div>
          <Table
            columns={[
              {
                Header: "",
                accessor: "label",
              },
              {
                Header: "",
                accessor: "value",
              },
            ]}
            items={[
              {
                label: "Alamat",
                value: (
                  <div>
                    {selectedAddress.name} <br />
                    {selectedAddress.province}, {selectedAddress.regency},
                    {selectedAddress.district}, {selectedAddress.village}
                    <br /> {selectedAddress.detail}
                  </div>
                ),
              },
              { label: "Subtotal", value: formatCurrency(sumPrice(cart)) },
              { label: "Ongkir", value: formatCurrency(config.global_ongkir) },
              {
                label: "Total",
                value: (
                  <b>
                    {formatCurrency(
                      sumPrice(cart) + parseInt(config.global_ongkir)
                    )}
                  </b>
                ),
              },
            ]}
            showPagination={false}
          />
          <br />
          <Responsive desktop={2} tablet={2} mobile={2}>
            <div>
              <Button
                onClick={() => setActiveStep(activeStep - 1)}
                color="gray"
                iconBefore={<FaArrowLeft />}
              >
                Sebelumnya
              </Button>
            </div>
            <div className="text-right">
              <Button
                color="red"
                size="large"
                iconBefore={<FaRegCheckCircle />}
              >
                Bayar
              </Button>
            </div>
          </Responsive>
        </div>
      ) : null}
    </LayoutOne>
  );
};

export default Checkout;
