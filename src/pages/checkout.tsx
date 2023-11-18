import { useState } from "react";
import { InputField } from "./sign-in";
import z from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

type ClientDataType = z.infer<typeof clientDataSchema>;

const clientDataSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  companyName: z.string().optional(),
  country: z.string(),
  streetAddress: z.string(),
  town: z.string(),
  postCode: z.string(),
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  email: z.string().email(),
});

const initialClientData = {
  firstName: "",
  lastName: "",
  companyName: "",
  country: "",
  streetAddress: "",
  town: "",
  postCode: "",
  phone: "",
  email: "",
};

const Checkout = () => {
  const [clientData, setClientData] =
    useState<ClientDataType>(initialClientData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <section>
      {/* Client info */}
      <section>
        <InputField
          label="First name"
          name="firstName"
          type="text"
          placeholder="John Doe"
          value={clientData.firstName}
          onChange={handleChange}
        />
      </section>
    </section>
  );
};

export default Checkout;
