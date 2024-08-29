export default function loading() {
  return (
    <div className="fixed inset-0 loading-background flex justify-center items-center backdrop-blur-md shadow-md z-50">
      <img src="./logo.png" alt="loading" className="w-24 h-24 animate-spin" />
    </div>
  );
}
