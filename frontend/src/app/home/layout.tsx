import '../globals.css';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex h-screen">
      <main className="overflow-y-auto h-full w-full bg-gray-200">
        {children}
      </main>
    </div>
  );
}