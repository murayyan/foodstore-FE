import * as React from "react";
import axios from "axios";
import { config } from "../../config";
import { oneOf, number, oneOfType, string, func, shape } from "prop-types";
import { Select } from "upkit";

const SelectRegion = ({ level, parentCode, onChange, value }) => {
  let [data, setData] = React.useState([]);
  let [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    setIsFetching(true);
    axios
      .get(`${config.api_host}/api/region/${level}?parent_code=${parentCode}`)
      .then(({ data }) => setData(data))
      .finally(() => setIsFetching(false));
  }, [parentCode, level]);

  return (
    <Select
      options={data.map((region) => ({
        label: region.name,
        value: region.code,
      }))}
      onChange={onChange}
      value={value}
      isLoading={isFetching}
      isDisabled={isFetching || !data.length}
    />
  );
};

SelectRegion.defaultProps = { level: "provinces" };

SelectRegion.propTypes = {
  level: oneOf(["provinces", "regencies", "districts", "villages"]),
  parentCode: oneOfType([number, string]),
  onChange: func,
  value: shape({ label: string, value: oneOfType([string, number]) }),
};

export default SelectRegion;
