// (1) import React
import * as React from "react";
// (2) import Link
import { Link } from "react-router-dom"; // (3) import `config`
import { config } from "../../config";

const StoreLogo = () => {
  return (
    <Link to="/">
      <div className="text-4xl font-bold text-red-600">{config.site_title}</div>{" "}
    </Link>
  );
};

export default StoreLogo;
