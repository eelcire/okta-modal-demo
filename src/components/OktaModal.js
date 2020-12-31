import React, { useEffect, useState, Fragment } from "react";

function OktaModal({ redirectUri, style, id }) {
  const [modalStyle, setModalStyle] = useState(style);
  // const []

  useEffect(() => {
    if (window.top.innerWidth < 700) {
      setModalStyle({
        ...style,
        width: "660px",
        height: "100vh",
        top: 0,
        right: 0,
        overflow: "auto",
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      });
    } else {
      setModalStyle({ ...style, width: "661px" });
    }
  }, [style]);

  if (!style) {
    window.top.onresize = () => {
      if (window.top.innerWidth < 661) {
        setModalStyle({ ...style, width: "100vw", top: 0, right: 0 });
      } else {
        setModalStyle({ ...style, width: "661px" });
      }
    };
  }

  return (
    <Fragment>
      <div style={{ overflow: "hidden" }} id={id}>
        <iframe
          title="okta-modal"
          style={style ? modalStyle : null}
          id="okta-modal"
          src={redirectUri}
        ></iframe>
      </div>
    </Fragment>
  );
}

export default OktaModal;
