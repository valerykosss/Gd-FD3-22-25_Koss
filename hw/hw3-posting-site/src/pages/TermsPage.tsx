import Accordion from "../components/Accordion";


const termsData = [
  {
    title: "Privacy Policy",
    content:
      "We value your privacy and ensure that your data is protected. Read more about our privacy practices here.",
  },
  {
    title: "User Agreement",
    content:
      "By using this website, you agree to follow our terms and conditions, ensuring a safe and respectful environment.",
  },
  {
    title: "Cookies Policy",
    content:
      "We use cookies to improve your experience. By continuing to use our site, you agree to our cookie policy.",
  },
];

export default function TermsPage() {

  return (
    <>
        <Accordion termsData={termsData} />
    </>
  );
}
