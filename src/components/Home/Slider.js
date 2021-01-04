export default function Slider() {
  return (
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            class="d-block w-100"
            src="/assets/images/home/slide-1.svg"
            alt="First slide"
          />
          <div class="carousel-caption d-none d-md-block">
            <h1 className="text-center heading">Tests Web App</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            src="/assets/images/home/slide-2.svg"
            alt="Second slide"
          />
          <div class="carousel-caption d-none d-md-block">
            <h2 className="text-center heading">Tests Web App</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            src="/assets/images/home/slide-3.svg"
            alt="Third slide"
          />
          <div class="carousel-caption d-none d-md-block">
            <h3 className="text-center heading">Tests Web App</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
