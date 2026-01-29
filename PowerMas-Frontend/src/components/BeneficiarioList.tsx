import type { Beneficiario } from '../types';
import { useState } from "react";
import type { EliminarBeneficiarioDto, UpdateBeneficiarioDto } from '../types';
import EliminarBeneficiario from './modals/EliminarBeneficiario';
import EditarBeneficiario from './modals/EditarBeneficiario';

import { FaDeleteLeft } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";

interface BeneficiarioListProps {
  beneficiarios: Beneficiario[];
  onEliminar: (id: number) => Promise<void>;
  onEditar: (id: number, data: UpdateBeneficiarioDto) => Promise<void>;
  isEliminando: boolean;
  isActualizando: boolean;
}

export default function BeneficiarioList({
  beneficiarios,
  onEliminar,
  onEditar,
  isEliminando,
  isActualizando
}: BeneficiarioListProps) {

    const [beneficiarioEliminando, setBeneficiarioEliminando] = useState<EliminarBeneficiarioDto | null>(null);
    const [beneficiarioEditando, setBeneficiarioEditando] = useState<UpdateBeneficiarioDto | null>(null);

    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    
    // abrir modalEditar
    const HandleAbrirModalEditar=(beneficiario: Beneficiario)=>{
        setBeneficiarioEditando({
            id: beneficiario.id,
            nombres: beneficiario.nombres,
            apellidos: beneficiario.apellidos,
            documentoIdentidadId: beneficiario.documentoIdentidadId,
            numeroDocumento: beneficiario.numeroDocumento,
            fechaNacimiento: beneficiario.fechaNacimiento,
            sexo: beneficiario.sexo
        });
        setModalEditar(true);
    };

    // cerrar modalEditar
    const HandleCerrarModalEditar=()=>{
        setBeneficiarioEditando(null)
        setModalEditar(false);
    };

    // abrir modalEliminar
    const HandleAbrirModalEliminar=(beneficiario: Beneficiario)=>{
        setBeneficiarioEliminando({
            id: beneficiario.id,
            nombres: beneficiario.nombres,
            apellidos: beneficiario.apellidos
        });
        setModalEliminar(true);
    };
    // cerrar modalEliminar
    const HandleCerrarModalEliminar=()=>{
        setBeneficiarioEliminando(null);
        setModalEliminar(false);
    };

    return (
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-400">
            <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-400">
                <tr>
                    <th className="px-4 py-3 text-left text-base font-bold text-gray-700">Nombres</th>
                    <th className="px-4 py-3 text-left text-base font-bold text-gray-700">Apellidos</th>
                    <th className="px-4 py-3 text-left text-base font-bold text-gray-700">Documento</th>
                    <th className="px-4 py-3 text-left text-base font-bold text-gray-700">País</th>
                    <th className="w-72 px-4 py-3 text-left text-base font-bold text-gray-700">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {beneficiarios.map(beneficiario => (
                    <tr key={beneficiario.id} className="border-b border-gray-400 last:border-b-0 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{beneficiario.nombres}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{beneficiario.apellidos}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                        {beneficiario.documentoIdentidad?.abreviatura}: {beneficiario.numeroDocumento}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{beneficiario.documentoIdentidad?.pais}</td>
                    <td className="px-4 py-3 text-sm flex justify-center items-center gap-1">
                        <button
                        className="
                            w-24 text-white bg-slate-600 hover:bg-slate-700 cursor-pointer border rounded-md py-1.5 font-semibold
                            flex items-center gap-2 justify-center
                        "
                        onClick={() => HandleAbrirModalEditar(beneficiario)}
                        >
                        <FaUserEdit />
                        Editar
                        </button>
                        <button
                        className="
                            w-24 text-white bg-red-400 hover:bg-red-500 cursor-pointer border rounded-md py-1.5 font-semibold
                            flex items-center gap-2 justify-center
                        "
                        onClick={() => HandleAbrirModalEliminar(beneficiario)}
                        >
                        <FaDeleteLeft />
                        Eliminar
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {beneficiarios.length === 0 && (
                <div className="p-8 text-center text-gray-500">No hay beneficiarios registrados</div>
            )}
            <EliminarBeneficiario
                isOpen={modalEliminar}
                onClose={HandleCerrarModalEliminar}
                beneficiario={beneficiarioEliminando}
                onConfirm={onEliminar}
                isEliminando={isEliminando}
            />

            <EditarBeneficiario
                isOpen={modalEditar}
                onClose={HandleCerrarModalEditar}
                beneficiario={beneficiarioEditando}
                onConfirm={onEditar}
                isActualizando={isActualizando}
            
            />
        </div>
    );
}