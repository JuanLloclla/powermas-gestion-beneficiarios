interface ModalEliminarProps {
  isOpen: boolean;
  onClose: () => void;
  beneficiario: {
    id: number;
    nombres: string;
    apellidos: string;
  } | null;
  onConfirm:(id: number) => Promise<void>;
  isEliminando:boolean;
}

export default function EliminarBeneficiario({
    isOpen,
    onClose,
    beneficiario,
    onConfirm,
    isEliminando

}: ModalEliminarProps){
    if(!isOpen || !beneficiario) return null;

    const handletEliminar = async () =>{
        await onConfirm(beneficiario.id);
        onClose();
    };
    return(
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-lg p-6 w-125">
            <h1 className="text-lg font-semibold mb-2 text-red-600">ALERTA</h1>
            <p className="mb-7">¿Seguro que quiere eliminar el resgistro de <strong>{beneficiario.nombres} {beneficiario.apellidos}</strong>?</p>
            <div className="flex justify-end gap-2 mt-4">
                <button 
                    className="py-1 text-white bg-red-500 rounded font-semibold cursor-pointer w-28 hover:bg-red-400"
                    onClick={handletEliminar}
                    disabled={isEliminando}
                >
                    {isEliminando? "Eliminando...": "Eliminar"}
                </button>
                <button 
                    className="py-1 bg-gray-300 rounded font-semibold cursor-pointer w-28 hover:bg-gray-400"
                    onClick={onClose}
                    disabled={isEliminando}
                >
                    Cancelar
                </button>
            </div>
            </div>
        </div>
    );
}