import { useRouter } from "next/router";
import React from "react";

const TypePage = () => {
  const router = useRouter();

  return <div>{router.asPath}</div>;
};

export default TypePage;
