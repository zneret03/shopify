import React from "react";
import Navbar from "../../components/public/Navbar";
import CalltoAction from "../../components/public/CallToAction";
import Footer from "../../components/public/Footer";
import ScrollToTop from "../../utils/ScrollToTop";
interface Props {
  children: React.ReactNode;
}
const Front: React.FC<Props> = ({ children }) => {
  return (
    <ScrollToTop>
      <React.Fragment>
        <Navbar />
        {children}
        <CalltoAction />
        <Footer />
      </React.Fragment>
    </ScrollToTop>
  );
};

export default Front;
