import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import FormField from "~/components/FormField";
import { useState, useEffect } from "react";

// Country/State/City fields
import {
  City,
  State,
  Country,
  type ICity,
  type IState,
} from "country-state-city";
import FormSelectField from "~/components/FormSelectField";

// Phone field
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CartItems } from "./cart";

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
  emailAddress: z
    .string()
    .min(1, { message: "Email address required" })
    .email(),
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
  const phoneNumber = watch("phone");

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
    <section className="padding-x max-w-[1600px] py-16">
      <section className="space-y-8">
        <h2 className="pb-4 text-2xl font-semibold">Billing information</h2>
        {/* Client info */}
        <div className="flex w-full gap-8">
          <FormField
            label="First name"
            type="text"
            name="firstName"
            placeholder="John"
            register={register("firstName")}
            error={errors.firstName?.message}
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
        <div className="w-[min(100%,256px)]">
          <FormField
            label="Company name (optional)"
            type="text"
            name="lastName"
            placeholder="Acme LLC."
            register={register("lastName")}
            error={errors.lastName?.message}
          />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-8">
          <FormSelectField
            data={countryData.map((country) => country.name)}
            label="Country"
            name="country"
            error={errors.country?.message}
            register={register("country")}
            required
          />
          <FormSelectField
            data={stateData?.map((state) => state.name)}
            label="State"
            name="state"
            error={errors.state?.message}
            register={register("state")}
            required
          />
          <FormSelectField
            data={cityData?.map((city) => city.name)}
            label="City"
            name="city"
            error={errors.city?.message}
            register={register("city")}
            required
          />
        </div>
        <FormField
          label="Address"
          name="streetAddress"
          error={errors.postCode?.message}
          placeholder="8, Wall str."
          type="text"
          register={register("streetAddress")}
          required
        />
        <div className="flex justify-start gap-4">
          <div className="w-32">
            <FormField
              label="Postcode/ZIP"
              name="postCode"
              error={errors.postCode?.message}
              placeholder="30003"
              type="text"
              register={register("postCode")}
              required
            />
          </div>
          <div className="relative">
            <label
              className={`${
                errors.phone?.message ? "text-red-500" : "text-slate-900"
              }   relative -top-2 font-bold `}
              htmlFor="phone"
            >
              Phone
              <span className="pl-1 text-red-500">*</span>
            </label>
            <PhoneInput
              inputStyle={{
                backgroundColor: "rgb(241 245 249)",
                borderColor: "rgb(226 232 240) ,",
                height: "2.5rem",
                fontSize: "1rem",
                fontFamily: "Open Sans",
              }}
              value={phoneNumber}
              onChange={(phone) => setValue("phone", phone)}
              country={countryData
                .find((country) => country.name === selectedCountry)
                ?.isoCode.toLowerCase()}
            />
            {errors.phone?.message && (
              <p className="absolute -top-1 right-0  rounded-full  text-sm font-bold text-red-500">
                {errors.phone?.message}
              </p>
            )}
          </div>
        </div>
        <FormField
          label="Email"
          name="emailAddress"
          error={errors.phone?.message}
          placeholder="johndoe123@mail.com"
          type="text"
          register={register("emailAddress")}
          required
        />
      </section>
      <div className="h-16"></div>
      <section>
        <h2 className="pb-4 text-2xl font-semibold">Payment Method</h2>
      </section>
      <div className="h-16"></div>
      <section>
        <h2 className="pb-4 text-2xl font-semibold">Your order</h2>
        <CartItems />
      </section>
    </section>
  );
};

export default Checkout;
