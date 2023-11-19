import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import FormField from "~/components/FormField";
import { useState, useEffect } from "react";
import {
  City,
  State,
  Country,
  type ICity,
  type IState,
  type ICountry,
} from "country-state-city";
import FormSelectField from "~/components/FormSelectField";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export type ClientDataValidationType = z.infer<typeof clientDataSchema>;

const clientDataSchema = z.object({
  firstName: z.string().min(1, { message: "First name required" }),
  lastName: z.string().min(1, { message: "Last name required" }),
  companyName: z.string().optional(),
  country: z.string().min(1, { message: "Country required" }),
  state: z.string().min(1, { message: "State required" }),
  city: z.string().min(1, { message: "Town required" }),
  streetAddress: z.string().min(1, { message: "Address required" }),
  postCode: z.string().min(1, { message: "Post code required" }),
  phone: z
    .string()
    .min(1, { message: "Phone number required" })
    .regex(phoneRegex, "Invalid phone number"),
  email: z.string().min(1, { message: "Email address required" }).email(),
});

const Checkout = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ClientDataValidationType>({
    resolver: zodResolver(clientDataSchema),
  });

  const countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState<IState[] | undefined>(undefined);
  const [cityData, setCityData] = useState<ICity[] | undefined>(undefined);

  const selectedCountry = watch("country");
  const selectedState = watch("state");

  useEffect(() => {
    const currentCountry = countryData.find(
      (country) => country.name === selectedCountry,
    )?.isoCode;
    setStateData(State.getStatesOfCountry(currentCountry));
    if (!stateData?.[0]) return;
    setValue("state", stateData?.[0]?.name);
  }, [selectedCountry, countryData]);

  useEffect(() => {
    if (!stateData) return;

    const currentCountry = countryData.find(
      (country) => country.name === selectedCountry,
    )?.isoCode;
    const currentState = stateData.find((state) => state.name === selectedState)
      ?.isoCode;
    console.log(currentState);
    if (!currentCountry || !currentState) return;
    setCityData(City.getCitiesOfState(currentCountry, currentState));
  }, [selectedState, countryData, selectedCountry, stateData]);

  useEffect(() => {
    if (!stateData?.[0]) return;
    stateData && setValue("state", stateData[0].name);
  }, [stateData, setValue]);

  useEffect(() => {
    if (!cityData?.[0]) return;
    cityData && setValue("city", cityData[0].name);
  }, [cityData, setValue]);

  return (
    <section className="padding-x max-w-[1600px] space-y-8 pt-16">
      {/* Client info */}
      <div className="flex w-full gap-8">
        <FormField
          label="First name"
          type="text"
          name="firstName"
          placeholder="John"
          register={register("firstName")}
          error={"First name required"}
          required
        />
        <FormField
          label="Last name"
          type="text"
          name="lastName"
          placeholder="Doe"
          register={register("lastName")}
          error={errors.lastName?.message}
          required
        />
      </div>
      <FormField
        label="Company name (optional)"
        type="text"
        name="lastName"
        placeholder="Acme LLC."
        register={register("lastName")}
        error={errors.lastName?.message}
      />
      <FormSelectField
        data={countryData.map((country) => country.name)}
        label="Country"
        name="country"
        error={errors.country?.message}
        register={register("country")}
      />
      <FormSelectField
        data={stateData?.map((state) => state.name)}
        label="State"
        name="state"
        error={errors.state?.message}
        register={register("state")}
      />
      <FormSelectField
        data={cityData?.map((city) => city.name)}
        label="City"
        name="city"
        error={errors.city?.message}
        register={register("city")}
      />
    </section>
  );
};

export default Checkout;
