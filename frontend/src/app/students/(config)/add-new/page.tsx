"use client"
import { AddStudentAction, ImportStudentsAction } from "@/actions/addCourse.action";
import ButtonContinue from "@/ui/buttons/buttonContinue";
import ButtonNormal from "@/ui/buttons/buttonNormal";
import { startTransition, useActionState, useState, useEffect } from "react"
import LoadingFile from "@/components/multiStepForm/loadingFile";
import { IStudentRequest } from "@/interfaces/IRequests.interface";
import { IconInfo } from "@/icons";
import Link from "next/link";

const INITIAL_STATE = {
    data: null
};

interface Props {
    setActiveTab: (index: number) => void;
    courseId: number | null;
}

export default function AddNewStudensts({ setActiveTab, courseId }: Props) {
    const [formState, formAction] = useActionState(
        AddStudentAction,
        INITIAL_STATE
    );
    console.log(formState);
    console.log('courseId', courseId);
    const [studentName, setStudentName] = useState("");
    const [studentList, setStudentList] = useState<IStudentRequest>({ alumnos: [] });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [excelFile, setExcelFile] = useState<File | null>(null);
    const [importError, setImportError] = useState<string | null>(null);
    const [importSuccess, setImportSuccess] = useState<string | null>(null);

    const handleAddStudent = () => {
        if (studentName.trim()) {
            const [lastName, ...firstNameParts] = studentName.split(' ');
            const firstName = firstNameParts.join(' ');
            const updatedList = {
                alumnos: [...studentList.alumnos, { curso_id: courseId!, nombre: firstName, apellido: lastName }]
            };

            setStudentList(updatedList);
            localStorage.setItem('studentsData', JSON.stringify(updatedList));

            setStudentName("");
        }
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (studentList.alumnos.length === 0) return;
        startTransition(() => {
            formAction(studentList);
        });

    };

    const handleSkip = () => {
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
        setImportSuccess('Estudiantes importados correctamente, será redirigido en breve...');
        startTransition(() => {
            formAction(studentList);
        });
        setTimeout(() => {
            setActiveTab(2);
        }, 3000);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleImport = () => {
        setIsImportModalOpen(true);
    }

    //cambiar nombre de la funcion y la logica cuando se pueda conectar
    const handleImportData = async () => {
        setLoading(true);
        setImportError(null);

        if (studentList.alumnos.length === 0 && excelFile) {
            const formData = new FormData();
            formData.append('file', excelFile);
            formData.append('curso_id', courseId!.toString());

            try {
                const result = await ImportStudentsAction(formData);
                console.log(result);
                if (result.success) {
                    setStudentList({ alumnos: result.data.alumnos });
                    setIsImportModalOpen(false);
                    setExcelFile(null);
                } else {
                    setImportError('Ocurrio un error al importar estudiantes');
                }
            } catch (error) {
                console.log(error);
                setImportError('Ocurrio un error al importar estudiantes');
            } finally {
                setLoading(false);
            }
        }
    }

    const handleCancelImport = () => {
        setIsImportModalOpen(false);
        setExcelFile(null);
    }

    /* useEffect(() => {
        if (formState.success) {
            setActiveTab(2);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formState.success]); */

    useEffect(() => {
        const storedStudents = localStorage.getItem('studentsData');
        if (storedStudents) {
            setStudentList(JSON.parse(storedStudents));
        }
    }, []);

    return (
        <div className="relative">
            <form onSubmit={handleSubmit} className="w-full h-screen p-16 flex flex-col">
                <div className="flex flex-col items-baseline gap-2">
                    <h2 className="font-semibold text-4xl">¿Quieres añadir tu lista de alumnos?</h2>
                    <span className="text-gray-500 text-xl">No te preocupes si ahora no tienes la lista competa, podrás agregar o editar alumnos más tarde</span>
                </div>
                <div className="flex flex-col gap-4 pt-11">
                    <label htmlFor="studentName" className="mr-2 font-bold text-2xl">Apellido y nombre del alumno:</label>
                    <div className="flex content-center items-center gap-4">
                        <input
                            className="h-12 border-2 border-black py-2 px-4 text-xl rounded-md focus-visible:outline-none mr-2"
                            type="text"
                            id="studentName"
                            name="studentName"
                            placeholder="Introduce nombre"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                        />

                        <ButtonNormal text="Añadir a la lista" color="bg-[#fbc82d]" onClick={handleAddStudent} />
                        <span className="text-lg font-bold mx-4">O</span>

                        <ButtonNormal text="Importar de excel" onClick={handleImport} />

                    </div>
                    <div className="text-gray-500 mt-2 flex gap-2"><IconInfo /> <span>Tu lista quedará ordenará automáticamente por orden alfabético</span></div>
                    <ul className="flex flex-wrap text-wrap gap-2 mt-4 px-32 max-h-[360px] overflow-y-scroll">
                        {studentList.alumnos.sort().map((student, index) => (
                            <li key={index} className="w-48 h-10 flex justify-between items-center border border-black px-2 rounded-md gap-2">
                                <p>{`${student.apellido} ${student.nombre}`}</p>
                                <button type="button" onClick={() => setStudentList({ alumnos: studentList.alumnos.filter((_, i) => i !== index) })}>
                                    ✖
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex mt-auto justify-center">
                    <div className="flex mx-auto gap-8">
                        <Link href="/students" className="flex gap-4 w-full justify-center mt-12 pb-12">
                            <button
                                type="button"
                                className="min-w-[130px] min-h-[48px] bg-white text-black border-2 border-black font-semibold text-[16px] px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]"
                            >
                                Cerrar
                            </button>
                            <button
                                type="submit"
                                className="min-w-[130px] min-h-[48px] bg-pink-500 text-white border-2 border-black font-semibold text-[16px] px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000] disabled:opacity-75 disabled:cursor-not-allowed"
                                disabled={studentList.alumnos.length === 0}
                            >
                                Guardar
                            </button>
                        </Link>
                    </div>
                </div>
            </form>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="flex flex-col gap-4 bg-yellow-100 p-4 rounded-lg w-[448px] h-[189px] px-6 filter drop-shadow-[18px_14px_0px_#000000]">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg">Omitir Paso</h3>
                            <button type="button" onClick={() => setIsModalOpen(!isModalOpen)}>✖</button>
                        </div>
                        <p>Puedes añadir esta información más tarde desde el menú de seguimiento.</p>
                        <div className="flex justify-end space-x-4 mt-auto">
                            <ButtonContinue type="button" text="Cancelar" color="bg-white" onClick={handleCancel} />
                            <ButtonContinue text="Omitir este paso" onClick={handleConfirm} />
                        </div>
                    </div>
                </div>
            )}

            {isImportModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col gap-2 bg-yellow-100 text-black-300 p-10 rounded-lg px-6 filter drop-shadow-[18px_14px_0px_#000000] w-5/6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-3xl mb-2">Importar desde Excel</h3>
                                <p className="text-gray-600">Sube tu archivo Excel con la lista de alumnos. Asegúrate de que incluya una única columna para &apos;Apellido&apos; y &apos;Nombre&apos;.</p>
                            </div>
                            <button type="button" onClick={() => setIsImportModalOpen(!isImportModalOpen)}>✖</button>
                        </div>
                        <div className="flex flex-col gap-4 items-center justify-center my-8">
                            <div className="relative">
                                <input
                                    type="file"
                                    className="absolute top-0 opacity-0 w-full h-full cursor-pointer z-10"
                                    onChange={(e) => setExcelFile(e.target.files![0])}
                                />
                                <ButtonContinue text={loading ? 'Procesando lista...' : 'Seleccione archivo desde dispositivo'} type="button" color="bg-yellow-500" />
                                <p className="my-2 ms-2 text-gray-500">{excelFile ? excelFile?.name + ' listo para subir' : ''}</p>
                            </div>
                            <p>O</p>
                            <div className="relative flex flex-col items-center justify-center border-2 border-gray-500 rounded-lg p-4 h-64 gap-8 py-8 w-9/12 bg-yellow-500/25">
                                <p className="font-semibold">{excelFile ? excelFile?.name : 'Arrastre y Suelte aquí'}</p>
                                <input
                                    type="file"
                                    className="absolute top-0 opacity-0 w-full h-full cursor-pointer"
                                    onChange={(e) => setExcelFile(e.target.files![0])}
                                />
                                <svg width="84" height="105" viewBox="0 0 84 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M52.4168 0.416016H10.7502C5.021 0.416016 0.385581 5.10352 0.385581 10.8327L0.333496 94.166C0.333496 99.8952 4.96891 104.583 10.6981 104.583H73.2502C78.9793 104.583 83.6668 99.8952 83.6668 94.166V31.666L52.4168 0.416016ZM73.2502 94.166H10.7502V10.8327H47.2085V36.8744H73.2502V94.166ZM21.1668 68.1764L28.5106 75.5202L36.7918 67.291V88.9577H47.2085V67.291L55.4897 75.5723L62.8335 68.1764L42.0522 47.291L21.1668 68.1764Z" fill="#3A3838" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 mt-auto">
                            <ButtonContinue text="Cancelar" type="button" color="bg-white" onClick={handleCancelImport} />
                            <ButtonContinue text={loading ? "Cargando..." : "Subir archivo Excel"} onClick={handleImportData} />
                        </div>
                        {importError && <div className="text-red-500 font-semibold capitalize">{importError}</div>}
                        {importSuccess && <div className="text-green-500 font-semibold capitalize">{importSuccess}</div>}
                    </div>
                </div>
            )}
            {loading && <LoadingFile setLoading={setLoading} />}
        </div>
    );
}