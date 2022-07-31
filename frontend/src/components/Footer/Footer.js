import React from "react";
import { SocialIcon } from "react-social-icons";
const Footer = () => (
  <footer
    className="page-footer font-small blue pt-4"
   
  >
    <div className="container-fluid text-center text-md-left">
      <div className="row">
        <div className="col-md-6 mt-md-0 mt-3">
          <h5 className="text-uppercase">welcome to our site</h5>
          <p>
            Here you can use rows and columns to organize your footer content.
          </p>
          <p>
            {" "}
            <SocialIcon url="https://twitter.com/HamzaKelila" />{" "}
            <SocialIcon url="https://www.facebook.com/profile.php?id=100008952490294" />{" "}
          </p>
        </div>

        <hr className="clearfix w-100 d-md-none pb-0" />

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">contact us</h5>
          <ul className="list-unstyled">
            <li>
              <p>
                {" "}
                <SocialIcon network="email" />
                hamzakelila1999@gmail.com{" "}
              </p>
            </li>
            <li>
              <p>
                {" "}
                <SocialIcon network="email" />
                mansourfrikha2019@gmail.com
              </p>
            </li>
          </ul>
        </div>

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">phone Number</h5>
          <ul className="list-unstyled">
            <li>
              <p>
                {" "}
                <SocialIcon network="whatsapp" /> +21629480261
              </p>
            </li>
            <li>
              <p>
                <SocialIcon network="whatsapp" /> +21621297320
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2022 Copyright</div>
  </footer>
);

export default Footer;
