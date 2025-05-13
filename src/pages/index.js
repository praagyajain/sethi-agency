import Head from "next/head";
import Header from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import Testimonial from "../components/Testimonial";
import Blogs from "../components/blogs";
import ContactForm from "../components/ContactForm";
import LatestProperty from "../components/LatestProperty"
import DreamProperty from "../components/DreamProperty";

const Home = () => {
  return (
    <div className="scrollable-content">
      <Head>
        <title>Sethi Estate Agency</title>
        <meta name="description" content="Sethi Estate Agency" />
      </Head>
      <Header />
      <section id="hero">
        <HeroSection />
      </section>
      <section>
        <DreamProperty/>
      </section>
      <section>
        <LatestProperty/>
      </section>
      <section>
        <Testimonial />
      </section>
      <section>
        <Blogs />
      </section>
       <section>
        <ContactForm />
      </section>
    </div>
  );
};

export default Home;
