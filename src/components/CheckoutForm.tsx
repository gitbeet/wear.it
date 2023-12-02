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
import { CartItems, Summary } from "~/pages/cart";
import Button from "./UI/Button";

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";
import { useCartContext } from "~/context/cartContext";
import { api } from "~/utils/api";

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

const CheckoutForm = () => {
  const { costs } = useCartContext();
  const stripe = useStripe();
  const elements = useElements();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    getValues,
    handleSubmit,
  } = useForm<ClientDataValidationType>({
    resolver: zodResolver(clientDataSchema),
  });

  const { mutate: createOrder, isLoading: isCreatingOrder } =
    api.order.createOrder.useMutation({
      onSuccess: () => console.log("ORDER CREATED SUCCESSFULLY"),
      onError: () => console.log("ERROR WHILE CREATING ORDER"),
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

  const handleSubmitStripe = async () => {
    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.log("SUBMIT ERROR: ", submitError);
      return;
    }

    const { data } = await axios.post("/api/create-payment-intent", {
      data: { amount: costs.totalCost },
    });
    const clientSecret = data.secret;

    console.log(costs.totalCost);
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: `${getValues("firstName")} ${getValues("lastName")}`,
            email: getValues("emailAddress"),
            phone: getValues("phone"),
            address: {
              country: countryData.find(
                (country) => country.name === getValues("country"),
              )?.isoCode,
              state: getValues("state"),
              city: getValues("city"),
              postal_code: getValues("postCode"),
              line1: getValues("streetAddress"),
            },
          },
        },
        return_url: `${window.origin}/successful`,
      },
    });

    if (error) {
      console.log("ERROR: ", error);
    }
    // createOrder();
  };

  const onSubmit = async () => {
    try {
      await handleSubmitStripe();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="padding-x mx-auto max-w-[1200px] grid-cols-[2fr,1.1fr] space-y-8 py-16 lg:grid lg:gap-8 lg:space-y-0"
    >
      {/* {clientSecret} */}
      <section>
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
              register={register("companyName")}
              error={errors.companyName?.message}
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
            error={errors.streetAddress?.message}
            placeholder="8, Wall str."
            type="text"
            register={register("streetAddress")}
            required
          />
          <div className="flex flex-wrap justify-start gap-4">
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
                  errors.phone?.message ? "text-red-500" : "text-slate-800"
                }   relative -top-1`}
                htmlFor="phone"
              >
                Phone
                <span className="pl-1 text-red-500">*</span>
              </label>
              <PhoneInput
                buttonStyle={{
                  borderTopColor: `${errors.phone?.message ? "red" : ""}`,
                  borderLeftColor: `${errors.phone?.message ? "red" : ""}`,
                  borderBottomColor: `${errors.phone?.message ? "red" : ""}`,
                }}
                inputStyle={{
                  minHeight: "48px",
                  backgroundColor: "white",
                  borderColor: "rgb(226 232 240) ,",
                  height: "2.5rem",
                  fontSize: "1rem",
                  fontFamily: "Open Sans",
                  borderTopColor: `${errors.phone?.message ? "red" : ""}`,
                  borderRightColor: `${errors.phone?.message ? "red" : ""}`,
                  borderBottomColor: `${errors.phone?.message ? "red" : ""}`,
                }}
                value={phoneNumber}
                onChange={(phone) => setValue("phone", phone)}
                country={countryData
                  .find((country) => country.name === selectedCountry)
                  ?.isoCode.toLowerCase()}
              />
              {errors.phone?.message && (
                <p className="absolute -bottom-5 right-0  rounded-full  text-sm text-red-500">
                  {errors.phone?.message}
                </p>
              )}
            </div>
          </div>
          <FormField
            label="Email"
            name="emailAddress"
            error={errors.emailAddress?.message}
            placeholder="johndoe123@mail.com"
            type="text"
            register={register("emailAddress")}
            required
          />
        </section>
        <div className="h-16"></div>
        <section>
          <h2 className="pb-8 text-2xl font-semibold">Payment Method</h2>
          <PaymentElement
            className="max-w-[550px]"
            options={{
              layout: "tabs",
              fields: {
                billingDetails: {
                  address: {
                    country: "never",
                    state: "never",
                    city: "never",
                  },
                },
              },
            }}
          />
        </section>
        <div className="h-16"></div>
        <CartItems page="checkout" />
      </section>
      <div>
        <Summary />
        <Button text="Pay now" onClick={() => void 0} />
      </div>
    </form>
  );
};

export default CheckoutForm;
