import React from "react";
import { Header } from "../components/Common/header";
import { Footer } from "../components/Common/footer";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { url } from "../utils/api/apiUrl";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { LoadingJSX } from "../components/Common/PageLoading";

const Venue = () => {
  const ArrayToMap = Array.from(Array(6).keys());
  const { id } = useParams<{ id: string }>();
  const [venueData, setVenueData] = React.useState({
    loading: {},
    data: [],
  });
  const history = useHistory();

  const fetchVenue = React.useCallback(async () => {
    try {
      setVenueData((d) => ({ ...d, loading: true }));
      const response = await axios.post(`${url}/getVenueDetails`, {
        id,
      });
      setVenueData((d) => ({ ...d, data: response.data, loading: false }));
    } catch {
      history.push("/");
    }
  }, [history, id]);

  React.useEffect(() => {
    fetchVenue();
  }, [fetchVenue]);

  const {
    name,
    address,
    phoneNumber,
    email,
    description,
    venueImages,
    venueMenus,
    venueTableLayout,
  }: any = venueData?.data ?? {};

  return (
    <div>
      <Header />
      {venueData?.loading ? (
        <LoadingJSX />
      ) : (
        <>
          <div className="min-h-[80vh] p-4">
            <div className="md:flex md:flex-row items-center">
              <div className="md:w-[40%]">
                <Carousel autoPlay>
                  {venueImages?.map((item: any) => (
                    <div key={item}>
                      <img alt="item" src={item} />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="md:w-[60%] p-4">
                <p className="text-2xl font-normal">{name}</p>
                <p>Address : {address}</p>
                <p>
                  E-mail : <a href="mailto:thetrendlyapp@gmail.com">{email}</a>
                </p>
                <p className="text-lg mb-4">{description}</p>
                <a
                  href={`tel:${phoneNumber}`}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Call the Venue
                </a>
              </div>
            </div>
            {venueMenus?.length !== 0 && (
              <div className="mt-5">
                <p className="text-xl font-medium mb-2">Menu</p>
                <div className="md:flex md:flex-wrap md:gap-2 space-y-2 md:space-y-0">
                  {venueMenus?.map((item: any) => (
                    <img
                      alt="menu"
                      key={item}
                      className="rounded h-80 object-cover md:w-80 w-full"
                      src={item}
                    />
                  ))}
                </div>
              </div>
            )}
            {venueTableLayout?.length !== 0 && (
              <div className="mt-5">
                <p className="text-xl font-medium mb-2">Table Layout</p>
                <div className="md:flex md:flex-wrap md:gap-2 space-y-2 md:space-y-0">
                  {venueTableLayout?.map((item: any) => (
                    <img
                      alt="menu"
                      key={item}
                      className="rounded h-80 object-cover md:w-80 w-full"
                      src={item}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Venue;
