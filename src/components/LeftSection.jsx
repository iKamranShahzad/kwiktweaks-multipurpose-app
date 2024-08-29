export default function LeftSection({ title, description }) {
  return (
    <div className="w-full md:w-1/3 p-4 md:p-6 bg-transparent text-white shadow-lg flex flex-col justify-center">
      <h2
        style={{ fontFamily: "Poppins, sans-serif" }}
        className="text-2xl md:text-3xl font-bold mb-4"
      >
        {title}
      </h2>
      <p
        style={{ fontFamily: "Poppins, sans-serif" }}
        className="text-base md:text-lg"
      >
        {description}
      </p>
    </div>
  );
}
