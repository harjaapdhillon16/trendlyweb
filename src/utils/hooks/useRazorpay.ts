import axios from "axios";
import { url } from "../api/apiUrl";

interface Props {
  totalPayment: number;
  email: string;
  phone: string;
  ticketData: any;
  eventId: string;
  serviceCharges: string;
}

export const useRazorpay = ({
  totalPayment,
  email,
  phone,
  ticketData,
  eventId,
  serviceCharges,
}: Props) => {
  function loadScript(src: string) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function handlePayment() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(`${url}/createOrder`, {
      amount: totalPayment * 100,
      curreny: "inr",
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id } = result.data;

    const options = {
      key: "rzp_test_5zxp7viRYgi6O8", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: "INR",
      name: "Trendly Media Private Limited.",
      description: "Event Tickets",
      order_id: order_id,
      handler: async function (response: any) {
        const data = {
          orderID: order_id,
          transaction: response,
          email,
          phone,
          ticketData,
          eventId: eventId,
          totalPayment: amount,
          serviceCharges: serviceCharges,
        };
        await axios.post(`${url}/verifyPaymentV2`, data);
      },
      prefill: {
        name: "",
        email: email,
        contact: phone,
      },
      theme: {
        color: "#ff4545",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  }
  return { handlePayment };
};
