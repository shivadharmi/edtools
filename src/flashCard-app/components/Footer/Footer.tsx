import React from "react";
import { t } from "../../../i18n";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="credits">
        <p>
          {t("Made with ❤️ by")} <span>{t("Siva Sankar Reddy Bogala")}</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
