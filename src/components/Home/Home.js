import Slider from "./Slider";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="home py-4">
        <div className="container">
          <Slider />
        </div>
      </main>
    </>
  );
}
