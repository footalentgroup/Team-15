import '../globals.css';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex h-screen">
      <main className="flex overflow-y-auto h-full w-full">
        {children}
      </main>
    </div>
  );
}