import { useEffect } from "react";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="text-white flex flex-col items-center justify-center p-10">
      <h2>Contact Us</h2>

      <p>
        If you have any questions, concerns, or need assistance, feel free to
        reach out to us.
      </p>

      <p>
        <strong>Website:</strong> TheTrio.in
      </p>

      <p>
        <strong>Email:</strong> costumersservice888@gmail.com
      </p>
    </div>
  );
};

export default ContactUs;
