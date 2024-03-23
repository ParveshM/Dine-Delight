import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { USER_API } from "../../../constants";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
const Payment = () => {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setclientSecret] = useState<string>("");
  useEffect(() => {
    setStripePromise(loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY));
    axios.post(USER_API + "/payment/intent").then(({ data }) => {
      setclientSecret(data.clientSecret);
    });
  }, []);
  return (
    // <form id="payment-form">
    //   <button id="payment-element" />
    //   <button id="submit">
    //     <span id="button-text">Paynow</span>
    //   </button>
    //   {/* Show any error or success messages
    //   {message && }
    //   */}
    //   <div id="payment-message">{"message"}</div>
    // </form>
    <div className="mt-20">
      <h1 className="text-center font-bold text-3xl">Payment section</h1>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
import { useStripe, useElements } from "@stripe/react-stripe-js";
export const PaymentForm = () => {
  const [message, setMessage] = useState<string | undefined | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:5173/payment_completed`,
      },
      redirect: "if_required",
    });
    if (error) setMessage(error?.message);
    else if (paymentIntent && paymentIntent.status === "succeeded")
      setMessage(`Payment status:${paymentIntent.status} 🎉`);
    else setMessage("Unexpected payment error");
    setIsProcessing(false);
  };
  return (
    <form
      className="bg-[#F6F9FC] border border-gray-200 rounded-lg shadow-lg p-6 max-w-sm mx-auto"
      onSubmit={handleSubmit}
    >
      <PaymentElement />

      <div className="mt-3">
        <button
          disabled={isProcessing}
          className="bg-[#635BFF] hover:brightness-110 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out"
        >
          {isProcessing ? "Processing..." : "Pay now"}
        </button>
      </div>
      {message && (
        <div className="text-sm font-medium text-green-600"> {message} </div>
      )}
    </form>
  );
};
