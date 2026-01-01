import { motion } from "framer-motion";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import SocialIcon from "./SocialIcon";

const Footer = () => {
  return (
    <footer className="bg-[#ffd6e4] pt-16 pb-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10">
          <div className="space-y-4">
            <h3 className="font-brand text-2xl ">MomEase</h3>
            <p className=" max-w-xs">
              Supporting mothers through every step of the postpartum journey.
            </p>

            <div className="flex gap-3">
              <SocialIcon icon={<FaLinkedinIn />} label="LinkedIn" />
              <SocialIcon icon={<FaInstagram />} label="Instagram" />
              <SocialIcon icon={<FaFacebookF />} label="Facebook" />
              <SocialIcon icon={<FaXTwitter />} label="X" />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-small">Useful links</h4>
            <ul className="space-y-2">
              <li>About us</li>
              <li>Careers</li>
              <li>News & Articles</li>
              <li>Legal Notice</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-small">Support</h4>
            <ul className="space-y-2 ">
              <li>Help center</li>
              <li>Contact us</li>
              <li>FAQ</li>
              <li>Parent community</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Contact info</h4>
            <p>Feel free to contact us</p>
            <p>1254 street, town</p>
            <p>(+20) 1146633258</p>
            <p>momease@gmail.com</p>
          </div>
        </div>

        <div className="border-t border-black/20 pt-4 text-center text-sm font-semibold">
          Copyright © 2025 MomEase. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
