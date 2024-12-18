import ProgressBar from "./progressBar";

interface Props {
  setLoading: (loading: boolean) => void
}

export default function LoadingFile({ setLoading }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="flex flex-col gap-4 bg-yellow-100 p-4 rounded-lg w-[448px] h-[189px] px-6 filter drop-shadow-[18px_14px_0px_#000000]">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Procesando documento</h3>
          <button type="button" onClick={() => setLoading(false)}>✖</button>
        </div>
        <p>Estamos extrayendo los contenidos. Esto no tomará más de unos segundos</p>
        <div className="relative w-full bg-gray-200 rounded-full h-4">
          <ProgressBar />
        </div>
      </div>
    </div>
  )
}