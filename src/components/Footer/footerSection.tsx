export default function Footer() {
  return (
    <footer className="border-t-2 border-blue-600 mt-20">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-blue-600 text-blue-600 text-sm font-mono uppercase">
        <a
          href="harisfirman387@gmail.com"
          className="flex items-center justify-center py-6 hover:bg-blue-600 hover:text-white transition-colors"
        >
          Email
        </a>

        <a
          href="https://www.instagram.com/harisardiann/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center py-6 hover:bg-blue-600 hover:text-white transition-colors"
        >
          Instagram
        </a>

        <a
          href="https://www.linkedin.com/in/haris-ardiansyah-835119247/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center py-6 hover:bg-blue-600 hover:text-white transition-colors"
        >
          LinkedIn
        </a>

        <a
          href="https://github.com/Naidleri"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center py-6 hover:bg-blue-600 hover:text-white transition-colors"
        >
          GitHub
        </a>
      </div>

      <div className="border-t-2 border-blue-600 text-blue-600 text-center py-12">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight uppercase">
          haris ardiansyah
        </h1>
      </div>
    </footer>
  );
}
