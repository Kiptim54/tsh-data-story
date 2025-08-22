import "./style.css";

// COMPONENTSs
import Header from "./components/Header.tsx";
import Diagnosis from "./components/Diagnosis.tsx";
import Flowers from "./components/Flowers.tsx";

function App() {
  return (
    <section className='bg-primary-100 min-h-screen text-primary-900 font-inclusive'>
      <Header />
      <Diagnosis />
      <Flowers />
    </section>
  );
}

export default App;
