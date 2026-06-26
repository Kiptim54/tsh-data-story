import "./style.css";
import { useState } from "react";

// COMPONENTSs
import Header from "./components/Header.tsx";
import Diagnosis from "./components/Diagnosis.tsx";
import Flowers from "./components/Flowers.tsx";
import LineChartSection from "./components/LineChartSection.tsx";
import Quote from "./components/Quote.tsx";
import Footer from "./components/Footer.tsx";
import Summary from "./components/Summary.tsx";

// COMPONENTS

import InfoDialog from "./components/ui/custom/InfoDialog.tsx";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const onClickInfoBtn = () => {
    setDialogOpen(!dialogOpen);
  };
  return (
    <section className='bg-primary-100 min-h-screen text-primary-900 font-inclusive flex flex-col gap-8 relative'>
      <Header />
      <Diagnosis />
      <LineChartSection />
      <Quote
        text='The word mindbody has been suggested to convey the real state of
          things. Not even in the West is mind-body thinking completely new. In
          one of Plato’s dialogues, Socrates quotes a Thracian doctor’s
          criticism of his Greek colleagues: “This is the reason why the cure of
          so many diseases is unknown to the physicians of Hellas; they are
          ignorant of the whole. For this is the great error of our day in the
          treatment of the human body, that physicians separate the mind from
          the body.” You cannot split mind from body, said Socrates—nearly two
          and a half millennia before the advent of
          psychoneuroimmunoendocrinology!'
        author='Gabor Mate'
        book='When the Body Says No: The Cost of Hidden Stress'
      />
      <Flowers />
      <Quote
        text='Facing a serious illness can be a radical space where life is reduced to more simple things. Normal activities and even planning for the future may no longer be an option. The hustle and bustle of work, family and social responsibilities is replaced by enormous new tasks such as getting out of bed, breathing, eating food, finding the right doctors, dealing with the roller-coaster journey to find the right medicines. It is an important question to ask – how can I rest into mind through this? What is it to rest the mind deeply when the heart and body are weary? Is it possible to let go such so that some equanimity can be found here in this new phase of life? In the face of losing so much, what remains within me? In this case we are asking, how can illness be further training?'
        book='Buddhist Advice for Carrying Illness Into the Path'
        author='Pema Khandro'
      />

      <Summary />
      <Footer />

      <InfoDialog open={dialogOpen} onClick={onClickInfoBtn} />
      <Analytics />
    </section>
  );
}

export default App;
