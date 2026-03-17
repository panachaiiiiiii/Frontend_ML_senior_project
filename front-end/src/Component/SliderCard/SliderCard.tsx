

type Slide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
};

const slides: Slide[] = [
  {
    id: 1,
    image: "/skin-rash.jpg",
    title: "รู้ทันมะเร็งผิวหนัง",
    subtitle: "Skin Cancer: Detect Early, Treat Right",
  },
  {
    id: 2,
    image: "/ex1.jpg",
    title: "ตรวจผิวก่อนลุกลาม",
    subtitle: "Early Detection Saves Lives",
  },
  {
    id: 3,
    image: "/ex1.jpg",
    title: "ตรวจผิวก่อนลุกลาม",
    subtitle: "Early Detection Saves Lives",
  },
  {
    id: 4,
    image: "/ex1.jpg",
    title: "ตรวจผิวก่อนลุกลาม",
    subtitle: "Early Detection Saves Lives",
  },
  {
    id: 5,
    image: "/ex1.jpg",
    title: "ตรวจผิวก่อนลุกลาม",
    subtitle: "Early Detection Saves Lives",
  },
];

export default function SliderCard() {




  return (
    <div className="flex overflow-x-auto w-full space-x-4 rounded-2xl mb-6">
  {slides.map((slide) => (
    <div
      key={slide.id}
      className="relative overflow-hidden rounded-2xl shadow-lg 
                 min-w-[320px] md:min-w-[420px]"
    >
      <img
        src={slide.image}
        className="h-[280px] w-full object-cover"
      />

      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
        <h2 className="text-yellow-400 font-bold text-lg">
          {slide.title}
        </h2>
        <p className="text-white text-sm">
          {slide.subtitle}
        </p>
      </div>
    </div>
  ))}
</div>

  );
}
