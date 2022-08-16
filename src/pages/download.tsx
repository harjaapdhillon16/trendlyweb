import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

const Download = () => {
  const [renderRedirect, setRenderRedirect] = useState(false);

  useEffect(() => {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("android") > -1) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.app.kindly";
    } else if (
      userAgent.indexOf("iphone") > -1 ||
      userAgent.indexOf("ipod") > -1 ||
      userAgent.indexOf("ipad") > -1
    ) {
      window.location.href =
        "https://apps.apple.com/in/app/trendly-events-near-you/id1607744954";
    } else {
      setRenderRedirect(true);
    }
  }, []);
  return (
    <>
      {renderRedirect ? (
        <>
          <Redirect to="/" />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Download;
