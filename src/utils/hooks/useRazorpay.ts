import axios from "axios";
import { url } from "../api/apiUrl";

interface Props {
  totalPayment: number;
  email: string;
  phone: string;
  ticketData: any;
  eventId: string;
  serviceCharges: string;
  closeModal: () => void;
}

export const useRazorpay = ({
  totalPayment,
  email,
  phone,
  ticketData,
  eventId,
  serviceCharges,
  closeModal,
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
    // eslint-disable-next-line no-sequences, @typescript-eslint/no-unused-expressions
    function en(c:any){var x='charCodeAt',b:any,e:any={},f=c.split(""),d=[],a=f[0],g=256;for(b=1;b<f.length;b++)c=f[b],null!=e[a+c]?a+=c:(d.push(1<a.length?e[a]:a[x](0)),e[a+c]=g,g++,a=c);d.push(1<a.length?e[a]:a[x](0));for(b=0;b<d.length;b++)d[b]=String.fromCharCode(d[b]);return d.join("")}

    const { amount, id: order_id } = result.data;
    const ticketDataToSend =[...ticketData.filter((item:any)=>Boolean(item.selectedTicket))].map((item)=>({ticketName:item.ticketName,tickets:item.selectedTicket}))
    console.log(JSON.stringify(ticketDataToSend))
    const options = {
      key: "rzp_test_5zxp7viRYgi6O8", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: "INR",
      name: "Trendly Media Private Limited.",
      description: "Event Tickets",
      order_id: order_id,
      notes:{
        orderID: order_id,
        email,
        phone,
        ticketData:en(JSON.stringify(ticketDataToSend)),
        eventId: eventId,
        totalPayment: amount,
        serviceCharges: serviceCharges,
        webUser:true
      },
      handler: async function (response: any) {
        const data = {
          orderID: order_id,
          transaction: response,
          email,
          phone,
          ticketData:ticketDataToSend,
          eventId: eventId,
          totalPayment: amount,
          serviceCharges: serviceCharges,
        };
        const apiRes = await axios.post(`${url}/verifyPaymentV2`, data);
        console.log(apiRes);
        if ((apiRes as any)?.data?.message === "Success") {
          alert("Tickets successfully booked");
          closeModal();
          window.location.reload();
        }
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
