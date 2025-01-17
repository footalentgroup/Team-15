import Link from "next/link";
import Image from "next/image";
import ButtonContinue from "@/ui/buttons/buttonContinue";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src="/PalProfeLogo.svg" alt="Logo" width={500} height={500} />
      <div className="flex justify-center gap-4">
        <Link href={'/login'}>
          <ButtonContinue text="Iniciar Sesión" type="button" />
        </Link>
        <Link href={'/register'}>
          <ButtonContinue text="Registrarse" color="bg-white" type="button" />
        </Link>
      </div>
    </div>
  );
}


