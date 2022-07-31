import React from "react";
import { SocialIcon } from "react-social-icons";

export default function contact() {
  return (
    <div>
      <iframe
        style={{ width: "100%", height: "400px" }}
        id="gmap_canvas"
        src="https://maps.google.com/maps?q=PQJ2+W4,%20Sfax&t=&z=13&ie=UTF8&iwloc=&output=embed"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
      ></iframe>
      <div style={{ width: "100%", height: "400px" }}>
        {" "}
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SocialIcon network="email" /> Find us at the office
        </h1>
        <h2> immeuble jawahara </h2>
        <h2>a cote du complexe jammousi</h2> <h2> ,bureau201-sfax</h2>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SocialIcon network="whatsapp" /> Give us a ring
        </h1>
        <h2> +21629480261</h2>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SocialIcon network="" /> Legal information
        </h1>
        <h2> btc pro</h2>
      </div>
    </div>
  );
}
