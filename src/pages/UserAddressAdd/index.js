import * as React from "react";
import { LayoutOne, InputText, FormControl, Textarea, Button } from "upkit";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SelectRegion from "../../components/selectRegion";
import { rules } from "./validation";
import { createAddress } from "../../api/address";

export default function UserAddressAdd() {
  let history = useHistory();
  let {
    handleSubmit,
    register,
    errors,
    setValue,
    watch,
    getValues,
  } = useForm();

  let allFields = watch();

  React.useEffect(() => {
    register({ name: "province" }, rules.province);
    register({ name: "regency" }, rules.regency);
    register({ name: "district" }, rules.disctrict);
    register({ name: "village" }, rules.village);
  }, [register]);

  React.useEffect(() => {
    setValue("regency", null);
    setValue("district", null);
    setValue("village", null);
  }, [allFields.province, setValue]);

  React.useEffect(() => {
    setValue("district", null);
    setValue("village", null);
  }, [allFields.regency, setValue]);

  React.useEffect(() => {
    setValue("village", null);
  }, [allFields.district, setValue]);

  const updateValue = (field, value) =>
    setValue(field, value, { shouldValidate: true, shouldDirty: true });

  const onSubmit = async (formData) => {
    let payload = {
      name: formData.address_name,
      detail: formData.detail_address,
      province: formData.province.label,
      regency: formData.regency.label,
      district: formData.district.label,
      village: formData.village.label,
    };
    let { data } = await createAddress(payload);
    if (data.error) return;
    history.push("/alamat-pengiriman");
  };
  return (
    <LayoutOne>
      <TopBar />
      <br />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            label="Nama alamat"
            errorMessage={errors.address_name?.message}
            color="black"
          >
            <InputText
              placeholder="Nama alamat"
              fitContainer
              name="address_name"
              ref={register(rules.address_name)}
            />
          </FormControl>
          <FormControl
            label="Provinsi"
            errorMessage={errors.province?.message}
            color="black"
          >
            <SelectRegion
              onChange={(option) => updateValue("province", option)}
              name="province"
              value={getValues().province}
            />
          </FormControl>
          <FormControl
            label="Kabupaten/kota"
            errorMessage={errors.regency?.message}
            color="black"
          >
            <SelectRegion
              level="regencies"
              parentCode={getValues().province?.value}
              onChange={(option) => updateValue("regency", option)}
              value={getValues().regency}
            />
          </FormControl>
          <FormControl
            label="Kecamatan"
            errorMessage={errors.district?.message}
            color="black"
          >
            <SelectRegion
              level="districts"
              parentCode={getValues().regency?.value}
              onChange={(option) => updateValue("district", option)}
              value={getValues().district}
            />
          </FormControl>
          <FormControl
            label="Kelurahan"
            errorMessage={errors.kelurahan?.message}
            color="black"
          >
            <SelectRegion
              level="villages"
              parentCode={getValues().district?.value}
              onChange={(option) => updateValue("village", option)}
              value={getValues().village}
            />
          </FormControl>
          <FormControl
            label="Detail alamat"
            errorMessage={errors.detail_address?.message}
            color="black"
          >
            <Textarea
              placeholder="Detail alamat"
              fitContainer
              name="detail_address"
              ref={register(rules.detail_address)}
            />
          </FormControl>
          <Button fitContainer>Simpan</Button>
        </form>
      </div>
    </LayoutOne>
  );
}
