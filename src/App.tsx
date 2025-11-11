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
      <Quote />
      <Flowers />
      <Summary />
      <Footer />

      <InfoDialog open={dialogOpen} onClick={onClickInfoBtn} />
    </section>
  );
}

export default App;
